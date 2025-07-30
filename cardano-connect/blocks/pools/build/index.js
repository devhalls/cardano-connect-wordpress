/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./pools/src/edit.js":
/*!***************************!*\
  !*** ./pools/src/edit.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./pools/src/editor.scss");
/* harmony import */ var _shared_editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../shared/editor.scss */ "./shared/editor.scss");
/* harmony import */ var _shared_components_Pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/Pagination */ "./shared/components/Pagination.jsx");
/* harmony import */ var _shared_components_Gated__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/components/Gated */ "./shared/components/Gated.jsx");
/* harmony import */ var _shared_components_Title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/Title */ "./shared/components/Title.jsx");
/* harmony import */ var _shared_components_form_GatedControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/components/form/GatedControl */ "./shared/components/form/GatedControl.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */






/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */







/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {JSX.Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes,
  isSelected
}) {
  /**
   * Create an array of view options.
   */
  const viewOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card grid'),
    value: 'grid'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('List table'),
    value: 'list'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mini Cards'),
    value: 'mini'
  }];

  /**
   * Create an array of gated logic options.
   */
  const gateOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No condition, always show content'),
    value: 'none'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delegated to any pool in the list'),
    value: 'any'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delegated to all pools in the list'),
    value: 'all'
  }];

  /**
   * Renders a placeholder pool for visual display in the block editor.
   * @param id
   * @param view
   * @return {JSX.Element}
   */
  const renderPlaceholder = (id, view) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: `pool-placeholder`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: 'pool-placeholder-head',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: 'pool-placeholder-image'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: 'pool-placeholder-title',
        children: id
      })]
    }), view === 'grid' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: 'pool-placeholder-blocks',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {})]
    }), view === 'mini' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: 'pool-placeholder-blocks',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {})
    })]
  }, id);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: `wpcc-block-control ${isSelected ? 'wpcc-block-control-edit' : ''}`,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: `${!isSelected ? 'hidden' : ''}`,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_shared_components_Title__WEBPACK_IMPORTED_MODULE_9__["default"], {
          title: 'Cardano Pool List'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Whitelist Pool ID(s)'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(Filter the list of pools by one or more pool ID(s). Enter one Pool ID per line)'),
          value: attributes.whitelist,
          onChange: nextValue => setAttributes({
            whitelist: nextValue
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pools per page'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(Set to 0 to disable pagination, max 100)'),
          value: attributes.per_page,
          min: 0,
          max: 100,
          step: 1,
          onChange: nextValue => setAttributes({
            per_page: parseInt(nextValue)
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Not found text'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(Replaces default options not found text with a custom message for this block)'),
          value: attributes.not_found,
          onChange: nextValue => setAttributes({
            not_found: nextValue
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select pool view template'),
          selected: attributes.view || 'grid',
          onChange: value => setAttributes({
            view: value
          }),
          options: viewOptions
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_shared_components_form_GatedControl__WEBPACK_IMPORTED_MODULE_10__["default"], {
          gated: attributes.gated,
          gate_hide_component: attributes.gate_hide_component,
          gated_placeholder: attributes.gated_placeholder,
          gate: attributes.gate,
          gateOptions: gateOptions,
          setAttributes: setAttributes
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: `${isSelected ? 'hidden' : ''}`,
        children: [!attributes.gate_hide_component ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
          children: [!attributes.per_page && attributes.per_page !== 0 || attributes.per_page > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_shared_components_Pagination__WEBPACK_IMPORTED_MODULE_7__["default"], {
            per_page: attributes.per_page
          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
            className: `pools-placeholder pools-${attributes.view || 'grid'}`,
            children: attributes.whitelist?.length > 0 ? attributes.whitelist.split('\n').map(id => renderPlaceholder(id, attributes.view || 'grid')) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
              children: [renderPlaceholder('Placeholder pool 1', attributes.view || 'grid'), renderPlaceholder('Placeholder pool 2', attributes.view || 'grid'), renderPlaceholder('Placeholder pool 3', attributes.view || 'grid'), renderPlaceholder('Placeholder pool 4', attributes.view || 'grid')]
            })
          })]
        }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_shared_components_Gated__WEBPACK_IMPORTED_MODULE_8__["default"], {
          gateOptions: gateOptions,
          gated_placeholder: attributes.gated_placeholder,
          gated: attributes.gated,
          gate: attributes.gate
        })]
      })]
    })
  });
}

/***/ }),

/***/ "./pools/src/index.js":
/*!****************************!*\
  !*** ./pools/src/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./pools/src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./pools/src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./pools/src/block.json");
/* harmony import */ var _shared_components_PluginIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/PluginIcon */ "./shared/components/PluginIcon.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  icon: {
    src: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_shared_components_PluginIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {})
  }
});

/***/ }),

/***/ "./shared/components/Gated.jsx":
/*!*************************************!*\
  !*** ./shared/components/Gated.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gated)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




/**
 * @param {{
 *   gated: string,
 *   gated_placeholder?: string,
 *   gate?: string
 *   gateOptions: []
 * }} attributes
 */

function Gated(attributes) {
  /**
   * Fetch available block patterns and create an array of options.
   */
  const [patternOptions, setPatternOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/cardano-connect/synced-patterns'
    }).then(data => {
      setPatternOptions(data.map(pattern => ({
        label: pattern.label,
        value: pattern.value
      })));
    }).catch(err => console.error('Error fetching patterns:', err));
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [attributes.gated_placeholder ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: 'wpcc-gated unlocked',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: 'wpcc-gated-title',
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: 'wpcc-gated-lock'
        }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gated placeholder:')]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: 'wpcc-gated-detail',
        children: patternOptions.find(g => g.value === attributes.gated_placeholder)?.label
      })]
    }) : null, attributes.gated ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: 'wpcc-gated locked',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: 'wpcc-gated-title',
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: 'wpcc-gated-lock'
        }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gated content:')]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: 'wpcc-gated-detail',
        children: patternOptions.find(g => g.value === attributes.gated)?.label
      }), " : ", attributes.gateOptions.find(g => g.value === (attributes.gate || 'any'))?.label]
    }) : null]
  });
}

/***/ }),

/***/ "./shared/components/Pagination.jsx":
/*!******************************************!*\
  !*** ./shared/components/Pagination.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function Pagination(attributes) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: 'wpcc-pagination',
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
      className: 'wpcc-number',
      children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page 1 / '), attributes.per_page || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('all')]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: 'wpcc-prev',
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Prev')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: 'wpcc-next',
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Next')
    })]
  });
}

/***/ }),

/***/ "./shared/components/PluginIcon.jsx":
/*!******************************************!*\
  !*** ./shared/components/PluginIcon.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PluginIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function PluginIcon() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
      opacity: 0.5,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        fill: '#096',
        d: "M89.46,31.24c.2.41.48.78.83,1.08.34.3.74.54,1.18.68.43.15.89.21,1.35.18.46-.03.9-.15,1.32-.35.41-.2.78-.48,1.08-.83.3-.34.54-.74.68-1.18.15-.43.21-.89.18-1.35s-.15-.9-.35-1.32l-6.26,3.07ZM92.93,58.55c-3.99,19.65-21.51,34.47-42.55,34.47v6.98c24.38,0,44.74-17.19,49.39-40.06l-6.84-1.39ZM50.38,93.02c-24,0-43.41-19.29-43.41-43.02H0C0,77.64,22.58,100,50.38,100v-6.98ZM6.98,50C6.98,26.27,26.38,6.98,50.38,6.98V0C22.58,0,0,22.36,0,50h6.98ZM87.9,46.51h-23.45v6.98h23.45v-6.98ZM50.38,6.98c17.19,0,32.04,9.91,39.08,24.26l6.26-3.07c-4.16-8.47-10.62-15.6-18.64-20.58C69.07,2.61,59.82-.02,50.38,0v6.98ZM99.77,59.94c1.56-7.71-5.04-13.43-11.87-13.43v6.98c3.53,0,5.52,2.7,5.03,5.06l6.84,1.39Z"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: '#096',
      d: "M66.83,50c0,2.22-.43,4.39-1.28,6.45-.85,2.06-2.08,3.89-3.65,5.46s-3.4,2.8-5.46,3.65c-2.06.85-4.23,1.28-6.45,1.28h-.93c-1.76,0-3.42-.69-4.67-1.93-1.25-1.25-1.94-2.91-1.94-4.67v-20.46c0-1.77.69-3.43,1.94-4.67,1.24-1.25,2.9-1.93,4.67-1.93h.93c2.22,0,4.39.43,6.45,1.28,2.05.85,3.89,2.08,5.46,3.65,1.57,1.57,2.79,3.41,3.65,5.46.85,2.05,1.28,4.22,1.28,6.44ZM48.23,60.23c0,.22.09.43.24.59.16.16.37.24.59.24h.93c1.46,0,2.89-.28,4.24-.84,1.35-.56,2.55-1.37,3.59-2.4,1.03-1.03,1.84-2.24,2.4-3.59,1.11-2.7,1.12-5.77,0-8.47-.56-1.36-1.37-2.56-2.4-3.59-1.03-1.03-2.24-1.84-3.59-2.4-1.35-.56-2.78-.84-4.24-.84h-.93c-.23,0-.44.09-.59.25s-.24.37-.24.59v20.46Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: '#096',
      d: "M48.23,43.02c0,1.59-1.29,2.88-2.88,2.88h-9.3c-1.59,0-2.88-1.29-2.88-2.88s1.29-2.88,2.88-2.88h9.3c1.59,0,2.88,1.29,2.88,2.88ZM48.23,56.98c0,1.59-1.29,2.88-2.88,2.88h-9.3c-1.59,0-2.88-1.29-2.88-2.88s1.29-2.88,2.88-2.88h9.3c1.59,0,2.88,1.29,2.88,2.88Z"
    })]
  });
}

/***/ }),

/***/ "./shared/components/Title.jsx":
/*!*************************************!*\
  !*** ./shared/components/Title.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Title)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function Title(attributes) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: 'wpcc-block-title',
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: 'wpcc-block-image'
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: 'wpcc-block-text',
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(attributes.title)
    })]
  });
}

/***/ }),

/***/ "./shared/components/form/GatedControl.jsx":
/*!*************************************************!*\
  !*** ./shared/components/form/GatedControl.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GatedControl)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





/**
 * @param {{
 *   gated: string,
 *   gated_placeholder?: string,
 *   gate?: string
 *   gate_hide_component?: boolean
 *   gateOptions: []
 *   patternOptions: []
 *   setPatternOptions: (a: any) => void
 *   setAttributes: (a: any) => void
 * }} attributes
 */

function GatedControl(attributes) {
  /**
   * Fetch available block patterns and create an array of options.
   */
  const [patternOptions, setPatternOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/cardano-connect/synced-patterns'
    }).then(data => {
      setPatternOptions(data.map(pattern => ({
        label: pattern.label,
        value: pattern.value
      })));
    }).catch(err => console.error('Error fetching patterns:', err));
  }, []);

  /**
   * Create options used in both select menus.
   */
  const defaultOptions = [
  // { label: __('— Wallet Connected —'), value: '' },
  // { label: __('Mint'), value: 'component_mint' },
  {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('— Select a Pattern —'),
    value: ''
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gated content to show when the selected condition passes'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Render this content when the current user PASSES the selected condition'),
      value: attributes.gated,
      options: [...defaultOptions, ...patternOptions],
      onChange: value => attributes.setAttributes({
        gated: value
      })
    }), attributes.gated ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
        __nextHasNoMarginBottom: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide content and only show gated content?'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Useful if you only want to show your custom gated content.'),
        checked: attributes.gate_hide_component,
        onChange: value => attributes.setAttributes({
          gate_hide_component: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content to show when the selected condition fails'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Render this content when the current user FAILS the selected logic.' + ' Leave blank to not show any content to the user until the condition passes.'),
        value: attributes.gated_placeholder,
        options: [...defaultOptions, ...patternOptions],
        onChange: value => attributes.setAttributes({
          gated_placeholder: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gated content condition'),
        selected: attributes.gate || 'any',
        onChange: value => attributes.setAttributes({
          gate: value
        }),
        options: attributes.gateOptions
      })]
    }) : null]
  });
}

/***/ }),

/***/ "./pools/src/editor.scss":
/*!*******************************!*\
  !*** ./pools/src/editor.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./pools/src/style.scss":
/*!******************************!*\
  !*** ./pools/src/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./shared/editor.scss":
/*!****************************!*\
  !*** ./shared/editor.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./pools/src/block.json":
/*!******************************!*\
  !*** ./pools/src/block.json ***!
  \******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"cardano-connect/pools","version":"0.1.0","title":"Cardano Pool List","category":"widgets","description":"Cardano pool listing, provides view for pools and their metadata. Optionally filterable by pool ID(s).","keywords":["Cardano","wallet","connect","SPOs"],"example":{},"supports":{"html":false},"textdomain":"cardano-connect","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./../../shared/render.php","attributes":{"whitelist":{"type":"string"},"per_page":{"type":"number","default":10},"not_found":{"type":"string"},"view":{"type":"string","default":"grid"},"gated":{"type":"string"},"gated_placeholder":{"type":"string"},"gate":{"type":"string","default":"none"},"gate_hide_component":{"type":"boolean","default":false}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkcardano_connect_blocks"] = globalThis["webpackChunkcardano_connect_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./pools/src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map