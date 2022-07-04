var _dt;
var _data;

function getChromeBugWorkAround() {
    //See http://stackoverflow.com/questions/8411031/aws-s3-file-downloads-are-not-working-in-chrome-works-fine-with-ie-mozilla-sa
    // https://forums.aws.amazon.com/thread.jspa?threadID=79493

    try {
        if (!navigator.plugins) return false;
        for (i = 0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name == 'Chrome PDF Viewer')
                return true;
        }

        return false;
    } catch (e) {
        return false;
    }
}


function downloadDoc(rowId) {
    return download(rowId, 'doc');
}


function downloadBibTeX(rowId) {
    return download(rowId, 'bib');
}


function download(rowId, kind) {

    var downloadFilename = null;

    var rowData = _dt.data()[rowId];

    var authors = rowData.Authors;
    var title = rowData.Title;
    var hash = rowData.Hash;
    var extension = rowData.Extension;

    try {
        var prefix = authors + ' - ' + title;

        //remove unicode that's been html encoded
        prefix = prefix.replace(/{&#.*?}/g, '_');

        downloadFilename = encodeURIComponent(prefix + '.' + extension);

        downloadFilename = downloadFilename.replace(/%23/g, '_');  //http://stackoverflow.com/questions/21597059/what-decodes-my-encoded-hash-symbol23
    } catch (e) {
        downloadFilename = "Unknown filename";
    }

    var link = $('#urlDownloadDoc').val().replace('**hash**', hash).replace('**extension**', extension).replace('**chromeBug**', getChromeBugWorkAround()).replace('**downloadFilename**', downloadFilename);
    if (kind == 'bib')
        link = $('#urlDownloadBibTeX').val().replace('**hash**', hash).replace('**extension**', extension).replace('**downloadFilename**', hash + ".bib");

    window.open(link, '_blank');
}


$(document).ready(function () {


    var nar = $('#nonAjaxRender').val() == 'True';
    if (!nar)
        _dt = $('#divLibrary').DataTable({

            "autoWidth": false,
            "dom": '<"H"lp><r><t><"F"i>',
            "paginationType": "full_numbers",
            "paginate": true,
            "jQueryUI": false,
            "filter": true,
            "processing": true,
            "serverSide": false, /* client side sorting/paginating */
            "lengthSize": true,
            "language": {
                "emptyTable": "No documents available in this library"
            },
            "lengthMenu": [[100, 1000, 10000, -1], [100, 1000, 10000, "All"]],

            //"data": _data,
            "deferRender": true,
            //"scrollY": "200px",

            "order": [[1, "asc"]],

            "ajax": function (data, callback, settings) {

                //                    aoData.push({ name: "filterTitle", value: $('#txtFilterTitle').val() });
                //                    aoData.push({ name: "filterAuthors", value: $('#txtFilterAuthors').val() });
                //                    aoData.push({ name: "filterAny", value: $('#txtFilterAny').val() });
                //                    aoData.push({ name: "filterTags", value: getTagsFilter() });

                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": $('#urlGetDocs').val(),
                    "data": data,
                    "success": function (resData, result) {

                        populateTagsFilter(resData);

                        var packaged = { data: resData };
                        callback(packaged, result);
                    }
                });
            },

            "columns": [
                {  /* Type icon */
                    "defaultContent": '',
                    "width": "10px",
                    "sortable": false,
                    "render": function (data, type, full, meta) {

                        if (type === 'display') {
                            if (full.IsUploaded === true) {
                                return '<button class="btn btn-sm" onclick="downloadDoc(' + meta.row + ');" title="Download document"><img src="/Content/images/Filetypes/pdf_16x16.gif" title="Download" /></button>';
                            } else {
                                return '<img src="/Content/images/Filetypes/pdf_bw_16x16.gif" title="Not uploaded" />';
                            }
                        }

                        return data;
                    }
                },
                {   /* Title*/
                    "data": "Title",
                    "name": "title",
                    "width": "450px",
                    "class": "row_title",
                    "render": function (data, type, full, meta) {
                        if (type === 'display') {
                            if (full.IsUploaded) {
                                return '<a href="#" onclick="downloadDoc(' + meta.row + ');return false;" title="Download document">' + full.Title + '</a>';
                            }

                            return sanitize(full.Title);
                        }

                        return full.Title;
                    }
                },
                {   /* Authors */
                    "data": "Authors",
                    "name": "authors",
                    "width": "350px",
                    "class": "row_authors",
                    "render": function (data, type, full, meta) {
                        if (type === 'display') {
                            return sanitize(full.Authors);
                        }

                        return full.Authors;
                    }
                },
                {   /* Year */
                    "data": "Year",
                    "width": "50px",
                    "render": function (data, type, full, meta) {
                        if (type === 'display') {
                            return sanitize(full.Year);
                        }

                        return full.Year;
                    }
                },
                {
                    "name": "tags",
                    "data": "Tags",
                    "class": "row_tags",
                    //"width": "150px",
                    "render": function (data, type, full, meta) {
                        if (type === 'display') {
                            var ret = '';
                            $.each(full.Tags, function () {
                                ret += '<span class="label label-info">' + sanitize(this) + '</span> ';
                            });

                            return ret;
                        }

                        return full.Tags;
                    }
                },
                {  /* BibTeX icon */
                    "defaultContent": '',
                    "width": "10px",
                    "sortable": false,
                    "render": function (data, type, full, meta) {

                        if (type === 'display') {
                            if (full.HasBibTeX === true)
                                return '<a href="#" class="" onclick="downloadBibTeX(' + meta.row + ');return false;" title="Download BibTeX">.bib</a>';
                            else
                                return null;
                        }

                        return null;
                    }
                }

    ]
        });

});

function doSearch() {

    _dt.columns('title:name').search($('#txtFilterTitle').val());
    _dt.columns('authors:name').search($('#txtFilterAuthors').val());
    _dt.columns('tags:name').search(getTagsFilter(), true /* is regex */ );
    
    //aoData.push({ name: "filterTags", value: getTagsFilter() });

    _dt.draw();
}

///Return regex of selected tags. 
function getTagsFilter() {
    var ret = '';
    var tags = $('#txtFilterTags').val() || new Array();
    for (var i = 0; i < tags.length; i++) {
        ret += tags[i] + '.*';
    }

    return ret;
}


function populateTagsFilter(resData) {

    var uniqueTags = [];
    for (var i = 0; i < resData.length; i++) {
        for (var j = 0; j < resData[i].Tags.length; j++) {
            if ($.inArray(resData[i].Tags[j], uniqueTags) == -1) 
                uniqueTags.push(resData[i].Tags[j]);
        }
    }

    $.each(uniqueTags, function (e, t) {
        var o = $('<option>');
        o.text(t);
        $('#txtFilterTags').append(o);
    });

    $('#txtFilterTags').show();
    
    //Set up type ahead on tags combo box
    $(".chosen-select").chosen({ no_results_text: "No results matched" });
};


