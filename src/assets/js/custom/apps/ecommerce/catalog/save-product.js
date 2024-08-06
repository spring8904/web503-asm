/* eslint-disable no-undef */
'use strict'
var KTAppEcommerceSaveProduct = (function () {
  const e = () => {
      $('#kt_ecommerce_add_product_options').repeater({
        initEmpty: !1,
        defaultValues: { 'text-input': 'foo' },
        show: function () {
          $(this).slideDown(), t()
        },
        hide: function (e) {
          $(this).slideUp(e)
        },
      })
    },
    t = () => {
      document
        .querySelectorAll(
          '[data-kt-ecommerce-catalog-add-product="product_option"]',
        )
        .forEach((e) => {
          $(e).hasClass('select2-hidden-accessible') ||
            $(e).select2({ minimumResultsForSearch: -1 })
        })
    }
  return {
    init: function () {
      var o, a
      ;[
        '#kt_ecommerce_add_product_category',
        '#kt_ecommerce_add_product_tags',
      ].forEach((e) => {
        const t = document.querySelector(e)
        t &&
          new Tagify(t, {
            whitelist: [
              'new',
              'trending',
              'sale',
              'discounted',
              'selling fast',
              'last 10',
            ],
            dropdown: {
              maxItems: 20,
              classname: 'tagify__inline__suggestions',
              enabled: 0,
              closeOnSelect: !1,
            },
          })
      }),
        (o = document.querySelector(
          '#kt_ecommerce_add_product_discount_slider',
        )),
        (a = document.querySelector(
          '#kt_ecommerce_add_product_discount_label',
        )),
        noUiSlider.create(o, {
          start: [10],
          connect: !0,
          range: { min: 1, max: 100 },
        }),
        o.noUiSlider.on('update', function (e, t) {
          ;(a.innerHTML = Math.round(e[t])),
            t && (a.innerHTML = Math.round(e[t]))
        }),
        e(),
        new Dropzone('#kt_ecommerce_add_product_media', {
          url: 'https://keenthemes.com/scripts/void.php',
          paramName: 'file',
          maxFiles: 10,
          maxFilesize: 10,
          addRemoveLinks: !0,
          accept: function (e, t) {
            'wow.jpg' == e.name ? t("Naha, you don't.") : t()
          },
        }),
        t(),
        (() => {
          const e = document.getElementById('kt_ecommerce_add_product_status'),
            t = document.getElementById(
              'kt_ecommerce_add_product_status_select',
            ),
            o = ['bg-success', 'bg-warning', 'bg-danger']
          $(t).on('change', function (t) {
            switch (t.target.value) {
              case 'published':
                e.classList.remove(...o), e.classList.add('bg-success'), c()
                break
              case 'scheduled':
                e.classList.remove(...o), e.classList.add('bg-warning'), r()
                break
              case 'inactive':
                e.classList.remove(...o), e.classList.add('bg-danger'), c()
                break
              case 'draft':
                e.classList.remove(...o), e.classList.add('bg-primary'), c()
            }
          })
          const a = document.getElementById(
            'kt_ecommerce_add_product_status_datepicker',
          )
          $('#kt_ecommerce_add_product_status_datepicker').flatpickr({
            enableTime: !0,
            dateFormat: 'Y-m-d H:i',
          })
          const r = () => {
              a.parentNode.classList.remove('d-none')
            },
            c = () => {
              a.parentNode.classList.add('d-none')
            }
        })(),
        (() => {
          const e = document.querySelectorAll('[name="method"][type="radio"]'),
            t = document.querySelector(
              '[data-kt-ecommerce-catalog-add-category="auto-options"]',
            )
          e.forEach((e) => {
            e.addEventListener('change', (e) => {
              '1' === e.target.value
                ? t.classList.remove('d-none')
                : t.classList.add('d-none')
            })
          })
        })(),
        (() => {
          let e
          const t = document.getElementById('kt_ecommerce_add_product_form'),
            o = document.getElementById('kt_ecommerce_add_product_submit')
          ;(e = FormValidation.formValidation(t, {
            fields: {
              isbn: {
                validators: { notEmpty: { message: 'Book ISBN is required' } },
              },
              title: {
                validators: { notEmpty: { message: 'Book title is required' } },
              },
              author: {
                validators: {
                  notEmpty: { message: 'Book author is required' },
                },
              },
              price: {
                validators: {
                  notEmpty: { message: 'Book price is required' },
                  numeric: { message: 'Book price must be a number' },
                  greaterThan: {
                    min: 0,
                    inclusive: false,
                    message: 'Book price must be greater than 0',
                  },
                },
              },
              quantity: {
                validators: {
                  notEmpty: { message: 'Book quantity is required' },
                  integer: {
                    message: 'Book quantity must be a integer number',
                  },
                  greaterThan: {
                    min: 0,
                    inclusive: false,
                    message: 'Book quantity must be greater than 0',
                  },
                },
              },
              year: {
                validators: {
                  notEmpty: { message: 'Book publication year is required' },
                  integer: {
                    message: 'Book publication year must be a number',
                  },
                  between: {
                    min: 1800,
                    max: 2024,
                    message:
                      'Book publication year must be between 1900 and 2024',
                  },
                },
              },
            },
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: '',
              }),
            },
          })),
            o.addEventListener('click', (t) => {
              t.preventDefault(),
                e &&
                  e.validate().then(function (e) {
                    console.log('validated!'),
                      'Valid' == e
                        ? (o.setAttribute('data-kt-indicator', 'on'),
                          (o.disabled = !0),
                          setTimeout(function () {
                            o.removeAttribute('data-kt-indicator'),
                              Swal.fire({
                                text: 'Form has been successfully submitted!',
                                icon: 'success',
                                buttonsStyling: !1,
                                confirmButtonText: 'Ok, got it!',
                                customClass: {
                                  confirmButton: 'btn btn-primary',
                                },
                              }).then(function (e) {
                                e.isConfirmed &&
                                  ((o.disabled = !1),
                                  t.target.closest('form').submit())
                              })
                          }, 100))
                        : Swal.fire({
                            html: 'Sorry, looks like there are some errors detected, please try again.',
                            icon: 'error',
                            buttonsStyling: !1,
                            confirmButtonText: 'Ok, got it!',
                            customClass: { confirmButton: 'btn btn-primary' },
                          })
                  })
            })
        })()
    },
  }
})()
KTUtil.onDOMContentLoaded(function () {
  KTAppEcommerceSaveProduct.init()
})
