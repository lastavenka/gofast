'use strict';

var date = document.querySelector(".shipping-date");
var hidePlaceholder = function () {
    date.classList.remove("placeholder");
}
var showPlaceholder = function () {
    date.classList.add("placeholder");
}
date.addEventListener("click", hidePlaceholder);

var optionsBtn = document.querySelector(".additional-options-btn");
var options = document.querySelector(".additional-options");
var inner = document.querySelector(".order-inner");
var title = document.querySelector(".order-title-outer");
var expandAnchor = document.querySelector(".expand-anchor");

var showOptions = function (evt) {
    inner.classList.add("order-inner-expand");
    options.classList.remove("additional-options-hide");
    title.classList.add("order-title-outer-expand");
    optionsBtn.classList.toggle("additional-options-btn-expand");

};
var hideOptions = function (evt) {
    inner.classList.remove("order-inner-expand");
    options.classList.add("additional-options-hide");
    title.classList.remove("order-title-outer-expand");
    optionsBtn.classList.toggle("additional-options-btn-expand");
};
var toggleOptions = function (evt) {
    evt.preventDefault();
    if (options.classList.contains("additional-options-hide")) {
        showOptions();
    } else {
        hideOptions();
    }
    expandAnchor.scrollIntoView(top);
}
optionsBtn.addEventListener('click', toggleOptions);

