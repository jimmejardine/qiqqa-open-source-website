$(document).ajaxStart(function (e, xhr, settings, exception) {
    //showAjaxBusy(true);
});



$(document).ajaxError(function (e, xhr, settings, exception) {
    handleAjaxError();
});

//function bindPrettyPhoto() {
//    $("a[rel^='prettyPhoto']").prettyPhoto({ theme: 'facebook' }); //Pretty photo lightbox links.
//}

$(document).ready(function () {


    //find any links marked as active, and ensure their li direct parents get the same class. This makes it much easier to add the active css class when emitting links in menus etc. 
    $('li>a.active').parent().addClass('active');

    if ($.trim($('#flashMessagePanelContent').text()).length > 0) {
        showAndHideFlashMessage();
    }

    $("input, select").focus(function () {
        $(this).addClass("inputFocus");
    });

    $("input, select").blur(function () {
        $(this).removeClass("inputFocus");
    });


    if ($('').dataTable != undefined) {

        makeDataTable($('table.defaultDt'));

        makeDataTableWithTools($('table.defaultDtWithTools'));
    }


    $(".collapsibleAccordian").accordion({
        collapsible: true, active: false
    });

    $('.lnkLanguages').click(function () {
        $('#pnlLanguageControl').toggle('slide');
        return false;
    });

    $('.autoTabs').tabs().show();

});


function makeDataTable(tbls, sortCol, sortDir) {
    sortDir = sortDir || "asc";

    tbls.dataTable({
        "autoWidth": true,
        "paginate": false,
        "jQueryUI": false,
        "filter": false,
        "processing": true,
        "serverSide": false,
    });

    if (sortCol != undefined) {
        tbls.DataTable().columns(sortCol).order(sortDir).draw();
    }
}

//sortDir = "asc", or "desc"
function makeDataTableWithTools(tbls, sortCol, sortDir) {

    sortDir = sortDir || "asc";

    tbls.dataTable({
        "autoWidth": true,
        "paginate": false,
        "jQueryUI": false,
        "filter": false,
        "serverSide": false,
        "dom": 'T<"clear">lfrtip',
    });

    if (sortCol != undefined) {
        tbls.DataTable().columns(sortCol).order(sortDir).draw();
    }
}


function flashMessage(msg) {
    $('#flashMessagePanelContent').text(msg);
    showAndHideFlashMessage();
}   

function showAndHideFlashMessage() {
    window.setTimeout(function () {
        $('#flashMessagePanel').fadeIn('fast');
    }, 100);

    $('#flashMessagePanelDismiss').click(function() {
        $('#flashMessagePanel').fadeOut('fast');
    });

//    window.setTimeout(function () {
//        $('#flashMessagePanel').fadeOut('fast');
//    }, 14000);
}

function showAjaxBusy(busy) {

    if (busy) {

        $.blockUI({ 
        
            message: $('<img src="..//Content/images/Loaders/ajax.gif" />'),

            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: 'transparent',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .9,
                color: '#000'
            }, 

            overlayCSS: { backgroundColor: '#333' }
        
         });


    } else {
        $.unblockUI();
    }

}


//Handles complete ajax fail - e.g. 500
function handleAjaxError() {
    alert('Unfortunately there was a problem performing that action. Please try again later.');
    showAjaxBusy(false);
}

//Generically handles server returning success= false;
function handleAjaxFail(data) {
    if (data.Message) {
        showAjaxBusy(false);
        alert(data.Message);
    } else {
        handleAjaxError();
    }
}


function standardAjaxCall(url, postData, successCallback) {

    $.ajax({
        beforeSend: function () {
            showAjaxBusy(true);
        },
        success: function (data, textStatus, XMLHttpRequest) {
            handleAjaxComplete(data, successCallback);
        },
        error: handleAjaxError,
        url: url,
        type: 'POST',
        data: postData
    });

}

//On successful http call, handles our standard json object result
function handleAjaxComplete(data, successCallback) {
    if (data.Success) {
        if (data.NextUrl) {
            doRedirect(data.NextUrl);
            return;
        }

        showAjaxBusy(false);

        if (successCallback) {
            successCallback();
        }

    } else {
        handleAjaxFail(data);
    }
}


//Filters array to unique
function distinctArray(anArray) {
    var result = [];
    $.each(anArray, function(i,v){
        if ($.inArray(v, result) == -1) result.push(v);
    });
    return result;
}


//cleans for use in html. Do not use in attributes, or js. 
function sanitize(text) {
    var o = $('<span>');
    o.text(text);

    return o.html();
}



function doRedirect(url) {
    window.location = url;
}


function trackGaEvent(category, action, opt_label, opt_value) {
    try {
        if (typeof _gaq === 'undefined') return;

        _gaq.push(['_setAccount', 'UA-16059803-1']);
        _gaq.push(['_trackEvent', category, action, opt_label, opt_value]);

        var abstract_page_for_event = "/events_tracking/" + category + "/" + action + "/" + opt_label + "/" + opt_value;
        _gaq.push(['_trackPageview', abstract_page_for_event]);
    } catch (e) {

    }
}


/* Begin logging */

function safeLog(msg) {
    try {
        console.log(msg);
    }
    catch (e) { }
}





///* --- Begin other scripts ---- */
/* ------------------------------------------------------------------------
Class: prettyPhoto
Use: Lightbox clone for jQuery
Author: Stephane Caron (http://www.no-margin-for-errors.com)
Version: 3.1.5
------------------------------------------------------------------------- */
(function (e) { function t() { var e = location.href; hashtag = e.indexOf("#prettyPhoto") !== -1 ? decodeURI(e.substring(e.indexOf("#prettyPhoto") + 1, e.length)) : false; return hashtag } function n() { if (typeof theRel == "undefined") return; location.hash = theRel + "/" + rel_index + "/" } function r() { if (location.href.indexOf("#prettyPhoto") !== -1) location.hash = "prettyPhoto" } function i(e, t) { e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var n = "[\\?&]" + e + "=([^&#]*)"; var r = new RegExp(n); var i = r.exec(t); return i == null ? "" : i[1] } e.prettyPhoto = { version: "3.1.5" }; e.fn.prettyPhoto = function (s) { function g() { e(".pp_loaderIcon").hide(); projectedTop = scroll_pos["scrollTop"] + (d / 2 - a["containerHeight"] / 2); if (projectedTop < 0) projectedTop = 0; $ppt.fadeTo(settings.animation_speed, 1); $pp_pic_holder.find(".pp_content").animate({ height: a["contentHeight"], width: a["contentWidth"] }, settings.animation_speed); $pp_pic_holder.animate({ top: projectedTop, left: v / 2 - a["containerWidth"] / 2 < 0 ? 0 : v / 2 - a["containerWidth"] / 2, width: a["containerWidth"] }, settings.animation_speed, function () { $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]); $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed); if (isSet && S(pp_images[set_position]) == "image") { $pp_pic_holder.find(".pp_hoverContainer").show() } else { $pp_pic_holder.find(".pp_hoverContainer").hide() } if (settings.allow_expand) { if (a["resized"]) { e("a.pp_expand,a.pp_contract").show() } else { e("a.pp_expand").hide() } } if (settings.autoplay_slideshow && !m && !f) e.prettyPhoto.startSlideshow(); settings.changepicturecallback(); f = true }); C(); s.ajaxcallback() } function y(t) { $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden"); $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () { e(".pp_loaderIcon").show(); t() }) } function b(t) { t > 1 ? e(".pp_nav").show() : e(".pp_nav").hide() } function w(e, t) { resized = false; E(e, t); imageWidth = e, imageHeight = t; if ((p > v || h > d) && doresize && settings.allow_resize && !u) { resized = true, fitting = false; while (!fitting) { if (p > v) { imageWidth = v - 200; imageHeight = t / e * imageWidth } else if (h > d) { imageHeight = d - 200; imageWidth = e / t * imageHeight } else { fitting = true } h = imageHeight, p = imageWidth } if (p > v || h > d) { w(p, h) } E(imageWidth, imageHeight) } return { width: Math.floor(imageWidth), height: Math.floor(imageHeight), containerHeight: Math.floor(h), containerWidth: Math.floor(p) + settings.horizontal_padding * 2, contentHeight: Math.floor(l), contentWidth: Math.floor(c), resized: resized} } function E(t, n) { t = parseFloat(t); n = parseFloat(n); $pp_details = $pp_pic_holder.find(".pp_details"); $pp_details.width(t); detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom")); $pp_details = $pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({ position: "absolute", top: -1e4 }); detailsHeight += $pp_details.height(); detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight; $pp_details.remove(); $pp_title = $pp_pic_holder.find(".ppt"); $pp_title.width(t); titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom")); $pp_title = $pp_title.clone().appendTo(e("body")).css({ position: "absolute", top: -1e4 }); titleHeight += $pp_title.height(); $pp_title.remove(); l = n + detailsHeight; c = t; h = l + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height(); p = t } function S(e) { if (e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i)) { return "youtube" } else if (e.match(/vimeo\.com/i)) { return "vimeo" } else if (e.match(/\b.mov\b/i)) { return "quicktime" } else if (e.match(/\b.swf\b/i)) { return "flash" } else if (e.match(/\biframe=true\b/i)) { return "iframe" } else if (e.match(/\bajax=true\b/i)) { return "ajax" } else if (e.match(/\bcustom=true\b/i)) { return "custom" } else if (e.substr(0, 1) == "#") { return "inline" } else { return "image" } } function x() { if (doresize && typeof $pp_pic_holder != "undefined") { scroll_pos = T(); contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width(); projectedTop = d / 2 + scroll_pos["scrollTop"] - contentHeight / 2; if (projectedTop < 0) projectedTop = 0; if (contentHeight > d) return; $pp_pic_holder.css({ top: projectedTop, left: v / 2 + scroll_pos["scrollLeft"] - contentwidth / 2 }) } } function T() { if (self.pageYOffset) { return { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset} } else if (document.documentElement && document.documentElement.scrollTop) { return { scrollTop: document.documentElement.scrollTop, scrollLeft: document.documentElement.scrollLeft} } else if (document.body) { return { scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft} } } function N() { d = e(window).height(), v = e(window).width(); if (typeof $pp_overlay != "undefined") $pp_overlay.height(e(document).height()).width(v) } function C() { if (isSet && settings.overlay_gallery && S(pp_images[set_position]) == "image") { itemWidth = 52 + 5; navWidth = settings.theme == "facebook" || settings.theme == "pp_default" ? 50 : 30; itemsPerPage = Math.floor((a["containerWidth"] - 100 - navWidth) / itemWidth); itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length; totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1; if (totalPage == 0) { navWidth = 0; $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide() } else { $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show() } galleryWidth = itemsPerPage * itemWidth; fullGalleryWidth = pp_images.length * itemWidth; $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected"); goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage; e.prettyPhoto.changeGalleryPage(goToPage); $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected") } else { $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave") } } function k(t) { if (settings.social_tools) facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)); settings.markup = settings.markup.replace("{pp_social}", ""); e("body").append(settings.markup); $pp_pic_holder = e(".pp_pic_holder"), $ppt = e(".ppt"), $pp_overlay = e("div.pp_overlay"); if (isSet && settings.overlay_gallery) { currentGalleryPage = 0; toInject = ""; for (var n = 0; n < pp_images.length; n++) { if (!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)) { classname = "default"; img_src = "" } else { classname = ""; img_src = pp_images[n] } toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>" } toInject = settings.gallery_markup.replace(/{gallery}/g, toInject); $pp_pic_holder.find("#pp_full_res").after(toInject); $pp_gallery = e(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li"); $pp_gallery.find(".pp_arrow_next").click(function () { e.prettyPhoto.changeGalleryPage("next"); e.prettyPhoto.stopSlideshow(); return false }); $pp_gallery.find(".pp_arrow_previous").click(function () { e.prettyPhoto.changeGalleryPage("previous"); e.prettyPhoto.stopSlideshow(); return false }); $pp_pic_holder.find(".pp_content").hover(function () { $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn() }, function () { $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut() }); itemWidth = 52 + 5; $pp_gallery_li.each(function (t) { e(this).find("a").click(function () { e.prettyPhoto.changePage(t); e.prettyPhoto.stopSlideshow(); return false }) }) } if (settings.slideshow) { $pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'); $pp_pic_holder.find(".pp_nav .pp_play").click(function () { e.prettyPhoto.startSlideshow(); return false }) } $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme); $pp_overlay.css({ opacity: 0, height: e(document).height(), width: e(window).width() }).bind("click", function () { if (!settings.modal) e.prettyPhoto.close() }); e("a.pp_close").bind("click", function () { e.prettyPhoto.close(); return false }); if (settings.allow_expand) { e("a.pp_expand").bind("click", function (t) { if (e(this).hasClass("pp_expand")) { e(this).removeClass("pp_expand").addClass("pp_contract"); doresize = false } else { e(this).removeClass("pp_contract").addClass("pp_expand"); doresize = true } y(function () { e.prettyPhoto.open() }); return false }) } $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () { e.prettyPhoto.changePage("previous"); e.prettyPhoto.stopSlideshow(); return false }); $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () { e.prettyPhoto.changePage("next"); e.prettyPhoto.stopSlideshow(); return false }); x() } s = jQuery.extend({ hook: "rel", animation_speed: "fast", ajaxcallback: function () { }, slideshow: 5e3, autoplay_slideshow: false, opacity: .8, show_title: true, allow_resize: true, allow_expand: true, default_width: 500, default_height: 344, counter_separator_label: "/", theme: "pp_default", horizontal_padding: 20, hideflash: false, wmode: "opaque", autoplay: true, modal: false, deeplinking: true, overlay_gallery: true, overlay_gallery_max: 30, keyboard_shortcuts: true, changepicturecallback: function () { }, callback: function () { }, ie6_fallback: true, markup: '<div class="pp_pic_holder"> 						<div class="ppt"> </div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>', gallery_markup: '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>', image_markup: '<img id="fullResImage" src="{path}" />', flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>', quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>', iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>', inline_markup: '<div class="pp_inline">{content}</div>', custom_markup: "", social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' }, s); var o = this, u = false, a, f, l, c, h, p, d = e(window).height(), v = e(window).width(), m; doresize = true, scroll_pos = T(); e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function () { x(); N() }); if (s.keyboard_shortcuts) { e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function (t) { if (typeof $pp_pic_holder != "undefined") { if ($pp_pic_holder.is(":visible")) { switch (t.keyCode) { case 37: e.prettyPhoto.changePage("previous"); t.preventDefault(); break; case 39: e.prettyPhoto.changePage("next"); t.preventDefault(); break; case 27: if (!settings.modal) e.prettyPhoto.close(); t.preventDefault(); break } } } }) } e.prettyPhoto.initialize = function () { settings = s; if (settings.theme == "pp_default") settings.horizontal_padding = 16; theRel = e(this).attr(settings.hook); galleryRegExp = /\[(?:.*)\]/; isSet = galleryRegExp.exec(theRel) ? true : false; pp_images = isSet ? jQuery.map(o, function (t, n) { if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).attr("href") }) : e.makeArray(e(this).attr("href")); pp_titles = isSet ? jQuery.map(o, function (t, n) { if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).find("img").attr("alt") ? e(t).find("img").attr("alt") : "" }) : e.makeArray(e(this).find("img").attr("alt")); pp_descriptions = isSet ? jQuery.map(o, function (t, n) { if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).attr("title") ? e(t).attr("title") : "" }) : e.makeArray(e(this).attr("title")); if (pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false; set_position = jQuery.inArray(e(this).attr("href"), pp_images); rel_index = isSet ? set_position : e("a[" + settings.hook + "^='" + theRel + "']").index(e(this)); k(this); if (settings.allow_resize) e(window).bind("scroll.prettyphoto", function () { x() }); e.prettyPhoto.open(); return false }; e.prettyPhoto.open = function (t) { if (typeof settings == "undefined") { settings = s; pp_images = e.makeArray(arguments[0]); pp_titles = arguments[1] ? e.makeArray(arguments[1]) : e.makeArray(""); pp_descriptions = arguments[2] ? e.makeArray(arguments[2]) : e.makeArray(""); isSet = pp_images.length > 1 ? true : false; set_position = arguments[3] ? arguments[3] : 0; k(t.target) } if (settings.hideflash) e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden"); b(e(pp_images).size()); e(".pp_loaderIcon").show(); if (settings.deeplinking) n(); if (settings.social_tools) { facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)); $pp_pic_holder.find(".pp_social").html(facebook_like_link) } if ($ppt.is(":hidden")) $ppt.css("opacity", 0).show(); $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity); $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + e(pp_images).size()); if (typeof pp_descriptions[set_position] != "undefined" && pp_descriptions[set_position] != "") { $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position])) } else { $pp_pic_holder.find(".pp_description").hide() } movie_width = parseFloat(i("width", pp_images[set_position])) ? i("width", pp_images[set_position]) : settings.default_width.toString(); movie_height = parseFloat(i("height", pp_images[set_position])) ? i("height", pp_images[set_position]) : settings.default_height.toString(); u = false; if (movie_height.indexOf("%") != -1) { movie_height = parseFloat(e(window).height() * parseFloat(movie_height) / 100 - 150); u = true } if (movie_width.indexOf("%") != -1) { movie_width = parseFloat(e(window).width() * parseFloat(movie_width) / 100 - 150); u = true } $pp_pic_holder.fadeIn(function () { settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined" ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html(" "); imgPreloader = ""; skipInjection = false; switch (S(pp_images[set_position])) { case "image": imgPreloader = new Image; nextImage = new Image; if (isSet && set_position < e(pp_images).size() - 1) nextImage.src = pp_images[set_position + 1]; prevImage = new Image; if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1]; $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]); imgPreloader.onload = function () { a = w(imgPreloader.width, imgPreloader.height); g() }; imgPreloader.onerror = function () { alert("Image cannot be loaded. Make sure the path is correct and image exist."); e.prettyPhoto.close() }; imgPreloader.src = pp_images[set_position]; break; case "youtube": a = w(movie_width, movie_height); movie_id = i("v", pp_images[set_position]); if (movie_id == "") { movie_id = pp_images[set_position].split("youtu.be/"); movie_id = movie_id[1]; if (movie_id.indexOf("?") > 0) movie_id = movie_id.substr(0, movie_id.indexOf("?")); if (movie_id.indexOf("&") > 0) movie_id = movie_id.substr(0, movie_id.indexOf("&")) } movie = "http://www.youtube.com/embed/" + movie_id; i("rel", pp_images[set_position]) ? movie += "?rel=" + i("rel", pp_images[set_position]) : movie += "?rel=1"; if (settings.autoplay) movie += "&autoplay=1"; toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie); break; case "vimeo": a = w(movie_width, movie_height); movie_id = pp_images[set_position]; var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/; var n = movie_id.match(t); movie = "http://player.vimeo.com/video/" + n[3] + "?title=0&byline=0&portrait=0"; if (settings.autoplay) movie += "&autoplay=1;"; vimeo_width = a["width"] + "/embed/?moog_width=" + a["width"]; toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, a["height"]).replace(/{path}/g, movie); break; case "quicktime": a = w(movie_width, movie_height); a["height"] += 15; a["contentHeight"] += 15; a["containerHeight"] += 15; toInject = settings.quicktime_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay); break; case "flash": a = w(movie_width, movie_height); flash_vars = pp_images[set_position]; flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length); filename = pp_images[set_position]; filename = filename.substring(0, filename.indexOf("?")); toInject = settings.flash_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars); break; case "iframe": a = w(movie_width, movie_height); frame_url = pp_images[set_position]; frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1); toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{path}/g, frame_url); break; case "ajax": doresize = false; a = w(movie_width, movie_height); doresize = true; skipInjection = true; e.get(pp_images[set_position], function (e) { toInject = settings.inline_markup.replace(/{content}/g, e); $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject; g() }); break; case "custom": a = w(movie_width, movie_height); toInject = settings.custom_markup; break; case "inline": myClone = e(pp_images[set_position]).clone().append('<br clear="all" />').css({ width: settings.default_width }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show(); doresize = false; a = w(e(myClone).width(), e(myClone).height()); doresize = true; e(myClone).remove(); toInject = settings.inline_markup.replace(/{content}/g, e(pp_images[set_position]).html()); break } if (!imgPreloader && !skipInjection) { $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject; g() } }); return false }; e.prettyPhoto.changePage = function (t) { currentGalleryPage = 0; if (t == "previous") { set_position--; if (set_position < 0) set_position = e(pp_images).size() - 1 } else if (t == "next") { set_position++; if (set_position > e(pp_images).size() - 1) set_position = 0 } else { set_position = t } rel_index = set_position; if (!doresize) doresize = true; if (settings.allow_expand) { e(".pp_contract").removeClass("pp_contract").addClass("pp_expand") } y(function () { e.prettyPhoto.open() }) }; e.prettyPhoto.changeGalleryPage = function (e) { if (e == "next") { currentGalleryPage++; if (currentGalleryPage > totalPage) currentGalleryPage = 0 } else if (e == "previous") { currentGalleryPage--; if (currentGalleryPage < 0) currentGalleryPage = totalPage } else { currentGalleryPage = e } slide_speed = e == "next" || e == "previous" ? settings.animation_speed : 0; slide_to = currentGalleryPage * itemsPerPage * itemWidth; $pp_gallery.find("ul").animate({ left: -slide_to }, slide_speed) }; e.prettyPhoto.startSlideshow = function () { if (typeof m == "undefined") { $pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function () { e.prettyPhoto.stopSlideshow(); return false }); m = setInterval(e.prettyPhoto.startSlideshow, settings.slideshow) } else { e.prettyPhoto.changePage("next") } }; e.prettyPhoto.stopSlideshow = function () { $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function () { e.prettyPhoto.startSlideshow(); return false }); clearInterval(m); m = undefined }; e.prettyPhoto.close = function () { if ($pp_overlay.is(":animated")) return; e.prettyPhoto.stopSlideshow(); $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"); e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () { e(this).remove() }); $pp_overlay.fadeOut(settings.animation_speed, function () { if (settings.hideflash) e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"); e(this).remove(); e(window).unbind("scroll.prettyphoto"); r(); settings.callback(); doresize = true; f = false; delete settings }) }; if (!pp_alreadyInitialized && t()) { pp_alreadyInitialized = true; hashIndex = t(); hashRel = hashIndex; hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1); hashRel = hashRel.substring(0, hashRel.indexOf("/")); setTimeout(function () { e("a[" + s.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click") }, 50) } return this.unbind("click.prettyphoto").bind("click.prettyphoto", e.prettyPhoto.initialize) }; })(jQuery); var pp_alreadyInitialized = false


/*!
* jQuery blockUI plugin
* Version 2.66.0-2013.10.09
* Requires jQuery v1.7 or later
*
* Examples at: http://malsup.com/jquery/block/
* Copyright (c) 2007-2013 M. Alsup
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* Thanks to Amir-Hossein Sobhi for some excellent contributions!
*/

; (function () {
"use strict";function setup(e){function a(i,a){var l,h;var m=i==window;var g=a&&a.message!==undefined?a.message:undefined;a=e.extend({},e.blockUI.defaults,a||{});if(a.ignoreIfBlocked&&e(i).data("blockUI.isBlocked"))return;a.overlayCSS=e.extend({},e.blockUI.defaults.overlayCSS,a.overlayCSS||{});l=e.extend({},e.blockUI.defaults.css,a.css||{});if(a.onOverlayClick)a.overlayCSS.cursor="pointer";h=e.extend({},e.blockUI.defaults.themedCSS,a.themedCSS||{});g=g===undefined?a.message:g;if(m&&o)f(window,{fadeOut:0});if(g&&typeof g!="string"&&(g.parentNode||g.jquery)){var y=g.jquery?g[0]:g;var b={};e(i).data("blockUI.history",b);b.el=y;b.parent=y.parentNode;b.display=y.style.display;b.position=y.style.position;if(b.parent)b.parent.removeChild(y)}e(i).data("blockUI.onUnblock",a.onUnblock);var w=a.baseZ;var E,S,x,T;if(n||a.forceIframe)E=e('<iframe class="blockUI" style="z-index:'+w++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+a.iframeSrc+'"></iframe>');else E=e('<div class="blockUI" style="display:none"></div>');if(a.theme)S=e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+w++ +';display:none"></div>');else S=e('<div class="blockUI blockOverlay" style="z-index:'+w++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');if(a.theme&&m){T='<div class="blockUI '+a.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(w+10)+';display:none;position:fixed">';if(a.title){T+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(a.title||"&nbsp;")+"</div>"}T+='<div class="ui-widget-content ui-dialog-content"></div>';T+="</div>"}else if(a.theme){T='<div class="blockUI '+a.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(w+10)+';display:none;position:absolute">';if(a.title){T+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(a.title||"&nbsp;")+"</div>"}T+='<div class="ui-widget-content ui-dialog-content"></div>';T+="</div>"}else if(m){T='<div class="blockUI '+a.blockMsgClass+' blockPage" style="z-index:'+(w+10)+';display:none;position:fixed"></div>'}else{T='<div class="blockUI '+a.blockMsgClass+' blockElement" style="z-index:'+(w+10)+';display:none;position:absolute"></div>'}x=e(T);if(g){if(a.theme){x.css(h);x.addClass("ui-widget-content")}else x.css(l)}if(!a.theme)S.css(a.overlayCSS);S.css("position",m?"fixed":"absolute");if(n||a.forceIframe)E.css("opacity",0);var N=[E,S,x],C=m?e("body"):e(i);e.each(N,function(){this.appendTo(C)});if(a.theme&&a.draggable&&e.fn.draggable){x.draggable({handle:".ui-dialog-titlebar",cancel:"li"})}var k=s&&(!e.support.boxModel||e("object,embed",m?null:i).length>0);if(r||k){if(m&&a.allowBodyStretch&&e.support.boxModel)e("html,body").css("height","100%");if((r||!e.support.boxModel)&&!m){var L=v(i,"borderTopWidth"),A=v(i,"borderLeftWidth");var O=L?"(0 - "+L+")":0;var M=A?"(0 - "+A+")":0}e.each(N,function(e,t){var n=t[0].style;n.position="absolute";if(e<2){if(m)n.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+a.quirksmodeOffsetHack+') + "px"');else n.setExpression("height",'this.parentNode.offsetHeight + "px"');if(m)n.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');else n.setExpression("width",'this.parentNode.offsetWidth + "px"');if(M)n.setExpression("left",M);if(O)n.setExpression("top",O)}else if(a.centerY){if(m)n.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');n.marginTop=0}else if(!a.centerY&&m){var r=a.css&&a.css.top?parseInt(a.css.top,10):0;var i="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+r+') + "px"';n.setExpression("top",i)}})}if(g){if(a.theme)x.find(".ui-widget-content").append(g);else x.append(g);if(g.jquery||g.nodeType)e(g).show()}if((n||a.forceIframe)&&a.showOverlay)E.show();if(a.fadeIn){var _=a.onBlock?a.onBlock:t;var D=a.showOverlay&&!g?_:t;var P=g?_:t;if(a.showOverlay)S._fadeIn(a.fadeIn,D);if(g)x._fadeIn(a.fadeIn,P)}else{if(a.showOverlay)S.show();if(g)x.show();if(a.onBlock)a.onBlock()}c(1,i,a);if(m){o=x[0];u=e(a.focusableElements,o);if(a.focusInput)setTimeout(p,20)}else d(x[0],a.centerX,a.centerY);if(a.timeout){var H=setTimeout(function(){if(m)e.unblockUI(a);else e(i).unblock(a)},a.timeout);e(i).data("blockUI.timeout",H)}}function f(t,n){var r;var i=t==window;var s=e(t);var a=s.data("blockUI.history");var f=s.data("blockUI.timeout");if(f){clearTimeout(f);s.removeData("blockUI.timeout")}n=e.extend({},e.blockUI.defaults,n||{});c(0,t,n);if(n.onUnblock===null){n.onUnblock=s.data("blockUI.onUnblock");s.removeData("blockUI.onUnblock")}var h;if(i)h=e("body").children().filter(".blockUI").add("body > .blockUI");else h=s.find(">.blockUI");if(n.cursorReset){if(h.length>1)h[1].style.cursor=n.cursorReset;if(h.length>2)h[2].style.cursor=n.cursorReset}if(i)o=u=null;if(n.fadeOut){r=h.length;h.stop().fadeOut(n.fadeOut,function(){if(--r===0)l(h,a,n,t)})}else l(h,a,n,t)}function l(t,n,r,i){var s=e(i);if(s.data("blockUI.isBlocked"))return;t.each(function(e,t){if(this.parentNode)this.parentNode.removeChild(this)});if(n&&n.el){n.el.style.display=n.display;n.el.style.position=n.position;if(n.parent)n.parent.appendChild(n.el);s.removeData("blockUI.history")}if(s.data("blockUI.static")){s.css("position","static")}if(typeof r.onUnblock=="function")r.onUnblock(i,r);var o=e(document.body),u=o.width(),a=o[0].style.width;o.width(u-1).width(u);o[0].style.width=a}function c(t,n,r){var i=n==window,s=e(n);if(!t&&(i&&!o||!i&&!s.data("blockUI.isBlocked")))return;s.data("blockUI.isBlocked",t);if(!i||!r.bindEvents||t&&!r.showOverlay)return;var u="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";if(t)e(document).bind(u,r,h);else e(document).unbind(u,h)}function h(t){if(t.type==="keydown"&&t.keyCode&&t.keyCode==9){if(o&&t.data.constrainTabKey){var n=u;var r=!t.shiftKey&&t.target===n[n.length-1];var i=t.shiftKey&&t.target===n[0];if(r||i){setTimeout(function(){p(i)},10);return false}}}var s=t.data;var a=e(t.target);if(a.hasClass("blockOverlay")&&s.onOverlayClick)s.onOverlayClick(t);if(a.parents("div."+s.blockMsgClass).length>0)return true;return a.parents().children().filter("div.blockUI").length===0}function p(e){if(!u)return;var t=u[e===true?u.length-1:0];if(t)t.focus()}function d(e,t,n){var r=e.parentNode,i=e.style;var s=(r.offsetWidth-e.offsetWidth)/2-v(r,"borderLeftWidth");var o=(r.offsetHeight-e.offsetHeight)/2-v(r,"borderTopWidth");if(t)i.left=s>0?s+"px":"0";if(n)i.top=o>0?o+"px":"0"}function v(t,n){return parseInt(e.css(t,n),10)||0}e.fn._fadeIn=e.fn.fadeIn;var t=e.noop||function(){};var n=/MSIE/.test(navigator.userAgent);var r=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);var i=document.documentMode||0;var s=e.isFunction(document.createElement("div").style.setExpression);e.blockUI=function(e){a(window,e)};e.unblockUI=function(e){f(window,e)};e.growlUI=function(t,n,r,i){var s=e('<div class="growlUI"></div>');if(t)s.append("<h1>"+t+"</h1>");if(n)s.append("<h2>"+n+"</h2>");if(r===undefined)r=3e3;var o=function(t){t=t||{};e.blockUI({message:s,fadeIn:typeof t.fadeIn!=="undefined"?t.fadeIn:700,fadeOut:typeof t.fadeOut!=="undefined"?t.fadeOut:1e3,timeout:typeof t.timeout!=="undefined"?t.timeout:r,centerY:false,showOverlay:false,onUnblock:i,css:e.blockUI.defaults.growlCSS})};o();var u=s.css("opacity");s.mouseover(function(){o({fadeIn:0,timeout:3e4});var t=e(".blockMsg");t.stop();t.fadeTo(300,1)}).mouseout(function(){e(".blockMsg").fadeOut(1e3)})};e.fn.block=function(t){if(this[0]===window){e.blockUI(t);return this}var n=e.extend({},e.blockUI.defaults,t||{});this.each(function(){var t=e(this);if(n.ignoreIfBlocked&&t.data("blockUI.isBlocked"))return;t.unblock({fadeOut:0})});return this.each(function(){if(e.css(this,"position")=="static"){this.style.position="relative";e(this).data("blockUI.static",true)}this.style.zoom=1;a(this,t)})};e.fn.unblock=function(t){if(this[0]===window){e.unblockUI(t);return this}return this.each(function(){f(this,t)})};e.blockUI.version=2.66;e.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1e3,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:false};var o=null;var u=[]}if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],setup)}else{setup(jQuery)}
})(); /* ---------------------------------------- ---------------------------------------- ----------------------------------------  */




/*!
* jQuery Form Plugin
* version: 2.94 (13-DEC-2011)
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: http://malsup.com/jquery/form/
* Dual licensed under the MIT and GPL licenses:
*	http://www.opensource.org/licenses/mit-license.php
*	http://www.gnu.org/licenses/gpl.html
*/
; (function ($) {

    /*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
    $('#myForm').bind('submit', function(e) {
    e.preventDefault(); // <-- important
    $(this).ajaxSubmit({
    target: '#output'
    });
    });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
    $('#myForm').ajaxForm({
    target: '#output'
    });
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
    */

    /**
    * ajaxSubmit() provides a mechanism for immediately submitting
    * an HTML form using AJAX.
    */
    $.fn.ajaxSubmit = function (options) {
        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        var method, action, url, $form = this;

        if (typeof options == 'function') {
            options = { success: options };
        }

        method = this.attr('method');
        action = this.attr('action');
        url = (typeof action === 'string') ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || 'GET',
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional;
        }

        var qx, n, v, a = this.formToArray(options.semantic);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional);
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a, traditional);
        if (qx) {
            q = (q ? (q + '&' + qx) : qx);
        }
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null;  // data is null for 'get'
        }
        else {
            options.data = q; // data is the query string for 'post'
        }

        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function () { $form.resetForm(); });
        }
        if (options.clearForm) {
            callbacks.push(function () { $form.clearForm(options.includeHidden); });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function () { };
            callbacks.push(function (data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        }
        else if (options.success) {
            callbacks.push(options.success);
        }

        options.success = function (data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || options; // jQuery 1.4+ supports scope context 
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };

        // are there files to upload?
        var fileInputs = $('input:file:enabled[value]', this); // [value] (issue #113)
        var hasFileInputs = fileInputs.length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

        var fileAPI = !!(hasFileInputs && fileInputs.get(0).files && window.FormData);
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function () {
                    fileUploadIframe(a);
                });
            }
            else {
                fileUploadIframe(a);
            }
        }
        else if ((hasFileInputs || multipart) && fileAPI) {
            options.progress = options.progress || $.noop;
            fileUploadXhr(a);
        }
        else {
            $.ajax(options);
        }

        // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;

        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
        function fileUploadXhr(a) {
            var formdata = new FormData();

            for (var i = 0; i < a.length; i++) {
                if (a[i].type == 'file')
                    continue;
                formdata.append(a[i].name, a[i].value);
            }

            $form.find('input:file:enabled').each(function () {
                var name = $(this).attr('name'), files = this.files;
                if (name) {
                    for (var i = 0; i < files.length; i++)
                        formdata.append(name, files[i]);
                }
            });

            if (options.extraData) {
                for (var k in options.extraData)
                    formdata.append(k, options.extraData[k])
            }

            options.data = null;

            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: 'POST'
            });

            s.context = s.context || s;

            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function (xhr, o) {
                o.data = formdata;
                if (xhr.upload) { // unfortunately, jQuery doesn't expose this prop (http://bugs.jquery.com/ticket/10190)
                    xhr.upload.onprogress = function (event) {
                        o.progress(event.position, event.total);
                    };
                }
                if (beforeSend)
                    beforeSend.call(o, xhr, options);
            };
            $.ajax(s);
        }

        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUploadIframe(a) {
            var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var useProp = !!$.fn.prop;

            if (a) {
                if (useProp) {
                    // ensure that every serialized input is still enabled
                    for (i = 0; i < a.length; i++) {
                        el = $(form[a[i].name]);
                        el.prop('disabled', false);
                    }
                } else {
                    for (i = 0; i < a.length; i++) {
                        el = $(form[a[i].name]);
                        el.removeAttr('disabled');
                    }
                };
            }

            if ($(':input[name=submit],:input[id=submit]', form).length) {
                // if there is an input with a name or id of 'submit' then we won't be
                // able to invoke the submit fn on the form (at least not x-browser)
                alert('Error: Form elements must not have name or id of "submit".');
                return;
            }

            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr('name');
                if (n == null)
                    $io.attr('name', id);
                else
                    id = n;
            }
            else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
            }
            io = $io[0];


            xhr = { // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function () { },
                getResponseHeader: function () { },
                setRequestHeader: function () { },
                abort: function (status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;
                    $io.attr('src', s.iframeSrc); // abort op in progress
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, e, status);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                    s.complete && s.complete.call(s.context, xhr, e);
                }
            };

            g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && !$.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                return;
            }
            if (xhr.aborted) {
                return;
            }

            // add submitting element to data if we know it
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
                return doc;
            }

            // Rails CSRF hack (thanks to Yvan Barthelemy)
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var csrf_param = $('meta[name=csrf-param]').attr('content');
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token;
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr('target'), a = $form.attr('action');

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (!method) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function () { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
                }

                // look for server aborts
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state.toLowerCase() == 'uninitialized')
                            setTimeout(checkState, 50);
                    }
                    catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        timeoutHandle && clearTimeout(timeoutHandle);
                        timeoutHandle = undefined;
                    }
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            extraInputs.push(
							$('<input type="hidden" name="' + n + '">').attr('value', s.extraData[n])
								.appendTo(form)[0]);
                        }
                    }

                    if (!s.iframeTarget) {
                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                        io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);
                    form.submit();
                }
                finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            }
            else {
                setTimeout(doSubmit, 10); // this lets dom updates render
            }

            var data, doc, domCheckCount = 50, callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }
                try {
                    doc = getDoc(io);
                }
                catch (ex) {
                    log('cannot access response document: ', ex);
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    return;
                }
                else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    return;
                }

                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut)
                        return;
                }
                io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

                var status = 'success', errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml)
                        s.dataType = 'xml';
                    xhr.getResponseHeader = function (header) {
                        var headers = { 'content-type': s.dataType };
                        return headers[header];
                    };
                    // support for XHR 'status' & 'statusText' emulation :
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }

                    var dt = (s.dataType || '').toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            // support for XHR 'status' & 'statusText' emulation :
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        }
                        else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            }
                            else if (b) {
                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
                            }
                        }
                    }
                    else if (dt == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    try {
                        data = httpData(xhr, dt, s);
                    }
                    catch (e) {
                        status = 'parsererror';
                        xhr.error = errMsg = (e || status);
                    }
                }
                catch (e) {
                    log('error caught: ', e);
                    status = 'error';
                    xhr.error = errMsg = (e || status);
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }

                if (xhr.status) { // we've set xhr.status
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (status === 'success') {
                    s.success && s.success.call(s.context, data, 'success', xhr);
                    g && $.event.trigger("ajaxSuccess", [xhr, s]);
                }
                else if (status) {
                    if (errMsg == undefined)
                        errMsg = xhr.statusText;
                    s.error && s.error.call(s.context, xhr, status, errMsg);
                    g && $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }

                g && $.event.trigger("ajaxComplete", [xhr, s]);

                if (g && ! --$.active) {
                    $.event.trigger("ajaxStop");
                }

                s.complete && s.complete.call(s.context, xhr, status);

                callbackProcessed = true;
                if (s.timeout)
                    clearTimeout(timeoutHandle);

                // clean up
                setTimeout(function () {
                    if (!s.iframeTarget)
                        $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function (s, doc) { // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                }
                else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            };
            var parseJSON = $.parseJSON || function (s) {
                return window['eval']('(' + s + ')');
            };

            var httpData = function (xhr, type, s) { // mostly lifted from jq1.4.4

                var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    $.error && $.error('parsererror');
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };
        }
    };

    /**
    * ajaxForm() provides a mechanism for fully automating form submission.
    *
    * The advantages of using this method instead of ajaxSubmit() are:
    *
    * 1: This method will include coordinates for <input type="image" /> elements (if the element
    *	is used to submit the form).
    * 2. This method will include the submit element's name/value data (for the element that was
    *	used to submit the form).
    * 3. This method binds the submit() method to the form for you.
    *
    * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
    * passes the options argument along after properly binding events for submit elements and
    * the form itself.
    */
    $.fn.ajaxForm = function (options) {
        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (this.length === 0) {
            var o = { s: this.selector, c: this.context };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function () {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        return this.ajaxFormUnbind().bind('submit.form-plugin', function (e) {
            if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
                e.preventDefault();
                $(this).ajaxSubmit(options);
            }
        }).bind('click.form-plugin', function (e) {
            var target = e.target;
            var $el = $(target);
            if (!($el.is(":submit,input:image"))) {
                // is this a child element of the submit el?  (ex: a span within a button)
                var t = $el.closest(':submit');
                if (t.length == 0) {
                    return;
                }
                target = t[0];
            }
            var form = this;
            form.clk = target;
            if (target.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $el.offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - target.offsetLeft;
                    form.clk_y = e.pageY - target.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function () { form.clk = form.clk_x = form.clk_y = null; }, 100);
        });
    };

    // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function () {
        return this.unbind('submit.form-plugin click.form-plugin');
    };

    /**
    * formToArray() gathers form element data into an array of objects that can
    * be passed to any of the following ajax functions: $.get, $.post, or load.
    * Each object in the array has both a 'name' and 'value' property.  An example of
    * an array for a simple login form might be:
    *
    * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
    *
    * It is this array that is passed to pre-submit callback functions provided to the
    * ajaxSubmit() and ajaxForm() methods.
    */
    $.fn.formToArray = function (semantic) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (!el.disabled && form.clk == el) {
                    a.push({ name: n, value: $(el).val(), type: el.type });
                    a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({ name: n, value: v[j] });
                }
            }
            else if (v !== null && typeof v != 'undefined') {
                a.push({ name: n, value: v, type: el.type });
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk), input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({ name: n, value: $input.val() });
                a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
            }
        }
        return a;
    };

    /**
    * Serializes form data into a 'submittable' string. This method will return a string
    * in the format: name1=value1&amp;name2=value2
    */
    $.fn.formSerialize = function (semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };

    /**
    * Serializes all field elements in the jQuery object into a query string.
    * This method will return a string in the format: name1=value1&amp;name2=value2
    */
    $.fn.fieldSerialize = function (successful) {
        var a = [];
        this.each(function () {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({ name: n, value: v[i] });
                }
            }
            else if (v !== null && typeof v != 'undefined') {
                a.push({ name: this.name, value: v });
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };

    /**
    * Returns the value(s) of the element in the matched set.  For example, consider the following form:
    *
    *  <form><fieldset>
    *	  <input name="A" type="text" />
    *	  <input name="A" type="text" />
    *	  <input name="B" type="checkbox" value="B1" />
    *	  <input name="B" type="checkbox" value="B2"/>
    *	  <input name="C" type="radio" value="C1" />
    *	  <input name="C" type="radio" value="C2" />
    *  </fieldset></form>
    *
    *  var v = $(':text').fieldValue();
    *  // if no values are entered into the text inputs
    *  v == ['','']
    *  // if values entered into the text inputs are 'foo' and 'bar'
    *  v == ['foo','bar']
    *
    *  var v = $(':checkbox').fieldValue();
    *  // if neither checkbox is checked
    *  v === undefined
    *  // if both checkboxes are checked
    *  v == ['B1', 'B2']
    *
    *  var v = $(':radio').fieldValue();
    *  // if neither radio is checked
    *  v === undefined
    *  // if first radio is checked
    *  v == ['C1']
    *
    * The successful argument controls whether or not the field element must be 'successful'
    * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
    * The default value of the successful argument is true.  If this value is false the value(s)
    * for each element is returned.
    *
    * Note: This method *always* returns an array.  If no valid value can be determined the
    *	array will be empty, otherwise it will contain one or more values.
    */
    $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            v.constructor == Array ? $.merge(val, v) : val.push(v);
        }
        return val;
    };

    /**
    * Returns the value of the field element.
    */
    $.fieldValue = function (el, successful) {
        var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [], ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) { // extra pain for IE...
                        v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };

    /**
    * Clears the form data.  Takes the following actions on the form's input fields:
    *  - input text fields will have their 'value' property set to the empty string
    *  - select elements will have their 'selectedIndex' property set to -1
    *  - checkbox and radio inputs will have their 'checked' property set to false
    *  - inputs of type submit, button, reset, and hidden will *not* be effected
    *  - button elements will *not* be effected
    */
    $.fn.clearForm = function (includeHidden) {
        return this.each(function () {
            $('input,select,textarea', this).clearFields(includeHidden);
        });
    };

    /**
    * Clears the selected form elements.
    */
    $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
        return this.each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea' || (includeHidden && /hidden/.test(t))) {
                this.value = '';
            }
            else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            }
            else if (tag == 'select') {
                this.selectedIndex = -1;
            }
        });
    };

    /**
    * Resets the form data.  Causes all form elements to be reset to their original value.
    */
    $.fn.resetForm = function () {
        return this.each(function () {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };

    /**
    * Enables or disables any matching elements.
    */
    $.fn.enable = function (b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function () {
            this.disabled = !b;
        });
    };

    /**
    * Checks/unchecks any matching checkboxes or radio buttons and
    * selects/deselects and matching option elements.
    */
    $.fn.selected = function (select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function () {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            }
            else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

    // expose debug var
    $.fn.ajaxSubmit.debug = false;

    // helper fn for console logging
    function log() {
        if (!$.fn.ajaxSubmit.debug)
            return;
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(msg);
        }
        else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    };

})(jQuery);



/**
 * Copyright (c) 2009 Anders Ekdahl (http://coffeescripter.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.2
 *
 * Demo and documentation: http://coffeescripter.com/code/editable-select/
 */
eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('(3($){5 g=[];$.1f.1H=3(a){5 b={m:k,12:k,14:10,15:k};5 c=$.1I(b,a);6(c.m&&!$.1J.1K){c.m=k};5 d=k;$(1).P(3(){5 i=g.r;6($(1).v(\'n-w\')!==1g){g[i]=1L h(1,c);$(1).v(\'n-w\',i)}});p $(1)};$.1f.1M=3(){5 a=[];$(1).P(3(){6($(1).v(\'n-w\')!==1g){a[a.r]=g[$(1).v(\'n-w\')]}});p a};5 h=3(a,b){1.1h(a,b)};h.1N={o:k,8:k,j:k,1O:0,7:k,16:20,E:0,Q:k,1P:k,m:k,F:\'\',1h:3(a,b){1.o=b;1.7=$(G.1i(\'1Q\'));1.7.R(\'n-j-1R\');1.j=$(a);1.8=$(\'<1S 1T="8">\');1.8.t(\'1j\',1.j.t(\'1j\'));1.8.v(\'n-w\',1.j.v(\'n-w\'));1.j.t(\'1k\',\'1k\');1.8[0].1l=1.j[0].1l;5 c=1.j.t(\'17\');6(!c){c=\'n-j\'+g.r};1.8.t(\'17\',c);1.8.t(\'1U\',\'1V\');1.8.R(\'n-j\');1.j.t(\'17\',c+\'1W\');1.j.1X(1.8);6(1.j.l(\'1m\')==\'1n\'){1.8.l(\'1m\',\'1n\')}6(1.j.l(\'A\')==\'18\'){1.8.l(\'A\',\'A\')}1.j.l(\'A\',\'18\');1.j.H();1.1o(1.8);1.1p();1.S();$(G.19).B(1.7);6(1.o.m){1.1q()}},1p:3(){5 b=1;5 c=$(G.1i(\'1r\'));1.7.B(c);5 d=1.j.u(\'1a\');d.P(3(){6($(1).t(\'x\')){b.8.s($(1).s());b.F=$(1).s()};5 a=$(\'<q>\'+$(1).s()+\'</q>\');b.1b(a);c.B(a)});1.1c()},1c:3(){5 a=1.7.u(\'q\');6(a.r>1.o.14){1.E=1.16*1.o.14;1.7.l(\'T\',1.E+\'U\');1.7.l(\'1s\',\'1t\')}I{1.7.l(\'T\',\'1t\');1.7.l(\'1s\',\'1u\')}},1Y:3(a){5 b=$(\'<q>\'+a+\'</q>\');5 c=$(\'<1a>\'+a+\'</1a>\');1.j.B(c);1.1b(b);1.7.u(\'1r\').B(b);1.S();1.1c()},1o:3(a){5 b=1;5 c=k;$(G.19).1v(3(){b.y();b.J()});a.1Z(3(){b.V();b.K()}).1v(3(e){e.1w();b.V();b.K()}).21(3(e){22(e.1x){L 23:6(!b.1y()){b.V();b.K()}I{e.M();b.1d(\'1z\')};W;L 24:e.M();b.1d(\'25\');W;L 9:b.X(b.N());W;L 27:e.M();b.J();p k;W;L 13:e.M();b.X(b.N());p k}}).26(3(e){6(c!==k){28(c);c=k};c=29(3(){6(b.8.s()!=b.F){b.F=b.8.s();b.K()}},2a)}).2b(3(e){6(e.1x==13){e.M();p k}})},1b:3(a){5 b=1;a.2c(3(){b.y();b.O(a)}).2d(3(e){e.1w();b.X(b.N())})},1d:3(a){5 b=1.N();6(!b.r){b=1.Y()};6(a==\'1z\'){5 c=b.2e()}I{5 c=b.2f()};6(c.r){1.O(c);1.Z(c);1.1A(b)}},O:3(a){1.y();a.R(\'x\')},Y:3(){1.y();5 a=1.7.u(\'q:2g\');a.R(\'x\');p a},1A:3(a){a.1B(\'x\')},N:3(){p 1.7.u(\'q.x\')},y:3(){1.7.u(\'q.x\').1B(\'x\')},X:3(a){6(a.r){1.8.s(a.8());1.F=1.8.s()};6(2h 1.o.12==\'3\'){1.o.12.2i(1,a)};1.J()},1y:3(){p 1.Q},V:3(){1.1C();1.S();1.7.11();1.1D();1.Q=1E;6(1.o.m){1.m.11()}},K:3(){5 b=1;5 c=1.8.s();6(c.r<0){6(2j){1.Y()};p};6(!b.o.15){c=c.1F()};5 d=k;5 e=k;5 f=1.7.u(\'q\');f.P(3(){6(!e){5 a=$(1).8();6(!b.o.15){a=a.1F()};6(a==c){e=1E;b.y();b.O($(1));b.Z($(1));p k}I 6(a.2k(c)===0&&!d){d=$(1)}}});6(d&&!e){b.y();b.O(d);b.Z(d)}I 6(!d&&!e){1.Y()}},Z:3(a){6(1.E){1.7.2l(a[0].2m-(1.E/2))}},J:3(){1.7.H();1.Q=k;6(1.o.m){1.m.H()}},1D:3(){2n(5 i=0;i<g.r;i++){6(i!=1.j.v(\'n-w\')){g[i].J()}}},1C:3(){5 a=1.8.2o();a={z:a.z,C:a.C};a.z+=1.8[0].1G;1.7.l({z:a.z+\'U\',C:a.C+\'U\'});1.7.l(\'A\',\'18\');1.7.11();1.16=1.7.u(\'q\')[0].1G;1.7.l(\'A\',\'1u\');1.7.H()},S:3(){1.j.11();5 a=1.j.D()+2;1.j.H();5 b=2p(1.8.l(\'2q-2r\').2s(/U/,\'\'),10);1.8.D(a-b);1.7.D(a+2);6(1.m){1.m.D(a+4)}},1q:3(){5 a=$(\'<1e 2t="0" 2u="n-j-1e" 2v="2w:2x;"></1e>\');$(G.19).B(a);a.D(1.j.D()+2);a.T(1.7.T());a.l({z:1.7.l(\'z\'),C:1.7.l(\'C\')});1.m=a}}})(2y);', 62, 159, '|this||function||var|if|wrapper|text|||||||||||select|false|css|bg_iframe|editable|settings|return|li|length|val|attr|find|data|selecter|selected|clearSelectedListItem|top|visibility|append|left|width|list_height|current_value|document|hide|else|hideList|highlightSelected|case|preventDefault|selectedListItem|selectListItem|each|list_is_visible|addClass|setWidths|height|px|showList|break|pickListItem|selectFirstListItem|scrollToListItem||show|onSelect||items_then_scroll|case_sensitive|list_item_height|id|hidden|body|option|initListItemEvents|checkScroll|selectNewListItem|iframe|fn|null|init|createElement|name|disabled|className|display|none|initInputEvents|duplicateOptions|createBackgroundIframe|ul|overflow|auto|visible|click|stopPropagation|keyCode|listIsVisible|down|unselectListItem|removeClass|positionElements|hideOtherLists|true|toLowerCase|offsetHeight|editableSelect|extend|browser|msie|new|editableSelectInstances|prototype|select_width|hide_on_blur_timeout|div|options|input|type|autocomplete|off|_hidden_select|after|addOption|focus||keydown|switch|40|38|up|keyup||clearTimeout|setTimeout|200|keypress|mouseover|mousedown|next|prev|first|typeof|call|highlight_first|indexOf|scrollTop|offsetTop|for|offset|parseInt|padding|right|replace|frameborder|class|src|about|blank|jQuery'.split('|'), 0, {}));




/*
* vertical news ticker
* Tadas Juozapaitis ( kasp3rito [eta] gmail (dot) com )
* http://www.jugbit.com/jquery-vticker-vertical-news-ticker/
*/
/* 
Modified by Richard Hollis 
*/
(function (e) { var t = { speed: 700, pause: 4e3, showItems: 3, mousePause: true, isPaused: false, isStopped: false, height: 30 }; var n = { options: null, maxHeight: 0, obj: null, animating: false, init: function (r) { var r = n.options = e.extend(t, r); var i = n.obj = e(this); var s = 0; i.css({ overflow: "hidden", position: "relative" }).children("ul").css({ position: "absolute", margin: 0, padding: 0 }).children("li").css({ margin: 0, padding: 0 }); if (r.height == 0) { i.children("ul").children("li").each(function () { if (e(this).height() > s) { n.maxHeight = e(this).height() } }); i.children("ul").children("li").each(function () { e(this).height(s) }); i.height(s * r.showItems) } else { i.height(r.height) } var o = setInterval(function () { n.nextUsePause() }, r.pause); if (r.mousePause) { i.bind("mouseenter", function () { n.pause(true) }).bind("mouseleave", function () { n.pause(false) }) } }, pause: function (e) { n.options.isPaused = e }, moveUp: function (t, r, i, s) { var o = t.children("ul"); var u = o.children("li:first").clone(true); if (i.height > 0) { r = o.children("li:first").height() } if (s && s.animate) { n.animating = true; o.animate({ top: "-=" + r + "px" }, i.speed, function () { e(this).children("li:first").remove(); e(this).css("top", "0px"); n.animating = false }) } else { o.children("li:first").remove(); o.css("top", "0px") } u.appendTo(o) }, moveDown: function (t, r, i, s) { var o = t.children("ul"); var u = o.children("li:last").clone(true); if (i.height > 0) { r = o.children("li:first").height() } o.css("top", "-" + r + "px").prepend(u); if (s && s.animate) { if (n.animating) return; n.animating = true; o.animate({ top: 0 }, i.speed, function () { e(this).children("li:last").remove(); n.animating = false }) } else { o.children("li:last").remove(); o.css("top", "0px") } }, nextUsePause: function () { if (n.options.isPaused || n.isStopped) return; n.next({ animate: true }) }, next: function (e) { if (n.animating || n.isStopped) return false; n.moveUp(n.obj, n.maxHeight, n.options, e) }, prev: function (e) { if (n.animating || n.isStopped) return false; n.moveDown(n.obj, n.maxHeight, n.options, e) }, stop: function () { n.isStopped = true; n.obj.css({ height: "", overflow: "", position: "" }).children("ul").css({ position: "", margin: 0, padding: 0 }).children("li").css({ margin: 0, padding: 0 }) } }; e.fn.vTicker = function (t) { if (n[t]) { return n[t].apply(this, Array.prototype.slice.call(arguments, 1)) } else if (typeof t === "object" || !t) { return n.init.apply(this, arguments) } else { e.error("Method " + t + " does not exist on jQuery.vTicker") } } })(jQuery)


/**
* Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
* Licensed under MIT
* @author Ariel Flesler
* @version 1.4.13
*/
; (function (k) { 'use strict'; k(['jquery'], function ($) { var j = $.scrollTo = function (a, b, c) { return $(window).scrollTo(a, b, c) }; j.defaults = { axis: 'xy', duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1, limit: !0 }; j.window = function (a) { return $(window)._scrollable() }; $.fn._scrollable = function () { return this.map(function () { var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!isWin) return a; var b = (a.contentWindow || a).document || a.ownerDocument || a; return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement }) }; $.fn.scrollTo = function (f, g, h) { if (typeof g == 'object') { h = g; g = 0 } if (typeof h == 'function') h = { onAfter: h }; if (f == 'max') f = 9e9; h = $.extend({}, j.defaults, h); g = g || h.duration; h.queue = h.queue && h.axis.length > 1; if (h.queue) g /= 2; h.offset = both(h.offset); h.over = both(h.over); return this._scrollable().each(function () { if (f == null) return; var d = this, $elem = $(d), targ = f, toff, attr = {}, win = $elem.is('html,body'); switch (typeof targ) { case 'number': case 'string': if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) { targ = both(targ); break } targ = win ? $(targ) : $(targ, this); if (!targ.length) return; case 'object': if (targ.is || targ.style) toff = (targ = $(targ)).offset() } var e = $.isFunction(h.offset) && h.offset(d, targ) || h.offset; $.each(h.axis.split(''), function (i, a) { var b = a == 'x' ? 'Left' : 'Top', pos = b.toLowerCase(), key = 'scroll' + b, old = d[key], max = j.max(d, a); if (toff) { attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]); if (h.margin) { attr[key] -= parseInt(targ.css('margin' + b)) || 0; attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0 } attr[key] += e[pos] || 0; if (h.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * h.over[pos] } else { var c = targ[pos]; attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c } if (h.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max); if (!i && h.queue) { if (old != attr[key]) animate(h.onAfterFirst); delete attr[key] } }); animate(h.onAfter); function animate(a) { $elem.animate(attr, g, h.easing, a && function () { a.call(this, targ, h) }) } }).end() }; j.max = function (a, b) { var c = b == 'x' ? 'Width' : 'Height', scroll = 'scroll' + c; if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()](); var d = 'client' + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body; return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]) }; function both(a) { return $.isFunction(a) || typeof a == 'object' ? a : { top: a, left: a} } return j }) } (typeof define === 'function' && define.amd ? define : function (a, b) { if (typeof module !== 'undefined' && module.exports) { module.exports = b(require('jquery')) } else { b(jQuery) } }));