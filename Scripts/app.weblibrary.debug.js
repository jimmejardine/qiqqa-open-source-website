
function generateData(count) {

    var data = [];
    var uploaded = false;
    
    for (var i = 0; i < count; i++) {
        var author = Math.random();
        uploaded = !uploaded;

        //[{ "Tags": ["DevDocs", "ITSO", "Official ITSO specs", "PM", "Projects", "Specs", "Ticketer"], "Hash": "11907E2540882B917319CC0E501D7D5C7D5BF4", "DocumentType": "Pdf", "Title": "123s&lt;script&gt;:", "Authors": "nik smitxxx", "Year": "(unknown year)", "DateAdded": "\/Date(1305292209921)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": ["atag", "btag"], "Hash": "1D899C8F5B06F013F8AB1AE976546617AE2CA", "DocumentType": "Pdf", "Title": "sdosjdfpoisdfj222333", "Authors": "(unknown authors)23423423", "Year": "(unknown year)", "DateAdded": "\/Date(1333281583742)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "27C835FEBDC84A21B313F616DD203376EA27EAC6", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-0_V2_1_4_2010-02", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305295808217)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "313736CC1DB8F37924FDFFC451142C36D474292E", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-7_V2_1_3_2008-04", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292209285)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "33932F51933959FAF8E7564B3FC8C85C91AFBE6", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-9_V2_1_4_2010-02 - Communications", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305295808513)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "3B4137CB3518EA1223D32ED85D774AF10C7092", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-3_V2_1_3_2008-04", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305295809745)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "3F5AE5327E4D4CE28F87838AF1163E25_REF", "DocumentType": "0", "Title": "(unknown title)", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1308404447847)\/", "IsUploaded": false, "Extension": "vanilla_reference" }, { "Tags": [], "Hash": "524773CE2F9765BD88625DFA29EFD1F35AB538AA", "DocumentType": "Pdf", "Title": "A comparison of dietary methods in nutritional  studies13", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1323312500341)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "544F7FD957B1DBD89877132AC6E5DFA8F6848287", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-4_V2_1_3_2008-04", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305295809677)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "6552A2C6727B4D5788EA34F2A9473FB81DC77ED", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-1_Contains_definitions", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305295808121)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "7F071F2E3C2C3B63A1878AA768447AF2829ADC", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-6_V2_1_4_2010-02_COR_2 - full list of messages and their details", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292208360)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "8AB3DD2ABC68203340FEFD317AE56699154A9A", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-8_V2_1_2_2007-06-ISAM", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292207891)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "979132D1A5DB40DA8D7A3BA93C0D755C_REF", "DocumentType": "0", "Title": "sss", "Authors": "sdsd", "Year": "van_year", "DateAdded": "\/Date(1333473691640)\/", "IsUploaded": false, "Extension": "vanilla_reference" }, { "Tags": [], "Hash": "AC23D4C3F41B984380BE9B33619233E1C8FFCFB9", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-10_V2_1_3_2008-04", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292208598)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "C8C23E9BD62687A42D2A24705219CB72B69429", "DocumentType": "Pdf", "Title": "sdfsdfsd", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1333281583633)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "C9BFF5B181846E29F59776F0B2D82170F9FBD61F", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-5_V2_1_3_2008-04_COR_4", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292209548)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "CE4BFAE8830DE99F83ECD10629FB8E05F1EE34", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-2_V2_1_3_2008-04_contains_info_on_shell_and_directory", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292209805)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "D651A5D5691F53EA6EB2B32ABD9CA92BC080D83F", "DocumentType": "Pdf", "Title": "ITSO_TS 1000-6 V2_1_3_2008-04_COR_9 - Message Data", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292209171)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "DBB032D77635BD328E9EB391F12694D753B", "DocumentType": "Pdf", "Title": "niksmit2222", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305292209859)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "E495CF76A5288837682641AC9F20D2836648573C", "DocumentType": "Pdf", "Title": "ITSO_TS_1000-9_V2_1_3_2008-04_COR_13_-_Interoperable_public_transport_ticketing_using_contactless_smart_customer_media_–_Part_9", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1305295808719)\/", "IsUploaded": false, "Extension": "pdf" }, { "Tags": [], "Hash": "EE22DC696DF94423B8BC1AA1788054DB_REF", "DocumentType": "0", "Title": "(unknown title)", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1308336897323)\/", "IsUploaded": false, "Extension": "vanilla_reference" }, { "Tags": ["atag", "ctag"], "Hash": "EFB7B45A46428D607970FFC0F58E9D67BA92A86F", "DocumentType": "Pdf", "Title": "D:\\temp\\pdfs\\1\\Doc0089.pdf", "Authors": "(unknown authors)", "Year": "(unknown year)", "DateAdded": "\/Date(1333281583713)\/", "IsUploaded": false, "Extension": "pdf"}]

        //data.push(["0DC24E37035745869FD87376A01FC9BB_REF", "0", "v3 " + i, author, "(unknown year)", "04/06/2012 08:55:00", uploaded ?"True":  "False", "vanilla_reference"]);

        data.push({ "Tags": ["DevDocs", "ITSO", "Official ITSO specs", "PM", "Projects", "Specs", "Ticketer"], "Hash": "11907E2540882B917319CC0E501D7D5C7D5BF4", "DocumentType": "Pdf", "Title": "123s&lt;script&gt;:" + i, "Authors": author, "Year": "(unknown year)", "DateAdded": "\/Date(1305292209921)\/", "IsUploaded": false, "Extension": "pdf" });
    }

    return data;
}


$(document).ready(function () {

    //_data = generateData(20000);

    var nar = $('#nonAjaxRender').val() == 'True';
    if (!nar)
        _dt = $('#divLibrary').DataTable({

            "autoWidth": false,
            "dom": '<"H"r>t<l"F"ip>',
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
            //"aLengthMenu": [10, 25, 50, -1], [10, 25, 50, "All"]], 

            //"data": _data,
            "deferRender": true,
            //"scrollY": "200px",

            "order": [[ 1, "asc" ]],

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
                                ret += '<span class="label label-info">' +  sanitize(this) + '</span> ';
                            });

                            return ret;
                        }

                        return full.Tags;
                    }
                }

    ]
        });

});
