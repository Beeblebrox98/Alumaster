var filter = {
    current_category: null,
    current_brand: [],
    setEvents: function () {
        // Устанавливаем ивенты на разворачивание\сворачивание списка
        let hidden_dropdowns = document.querySelectorAll('.dropdown>a')
        for (let dropdown of hidden_dropdowns) {
            dropdown.addEventListener('click', function () {
                if (dropdown.parentNode.querySelector('ul').classList.contains('hidden')) {
                    dropdown.parentNode.querySelector('ul').classList.remove('hidden')
                } else {
                    dropdown.parentNode.querySelector('ul').classList.add('hidden')
                }
            })
        }

        // Устанавливаем ивенты на разворачивание\сворачивание списка
        let category_filters = document.querySelectorAll('.products-filter__category>a')
        for (let category_filter of category_filters) {
            category_filter.addEventListener('click', function () {
                if (filter.current_category) {
                    let categoryDOM = document.getElementById(filter.current_category)
                    categoryDOM.children[0].classList.remove('selected')
                }
                category_filter.classList.add('selected')
                filter.current_category = category_filter.parentNode.id
                filter.filter()

            })
        }

        // Устанавливаем ивенты на производителя
        let brands = document.querySelectorAll('.producer-info-input>label')
        for (let brand of brands) {
            brand.addEventListener('click', function () {
                if (filter.current_brand.includes(brand.attributes.for.nodeValue)) {
                    brand.querySelector('input').checked = false
                    brand.querySelector('.stlcheck').classList.remove('stlcheck2')
                    filter.removeBrand(brand.attributes.for.nodeValue)
                }
                else {
                    brand.querySelector('input').checked = true
                    brand.querySelector('.stlcheck').classList.add('stlcheck2')
                    filter.current_brand.push(brand.attributes.for.nodeValue)
                }
                filter.filter()
            })
        }

    },
    removeBrand: function (brand) {

        this.current_brand = this.current_brand.filter(function (ele) {
            return ele !== brand;
        });
    },
    filterProduct: function (product) {
        if (this.current_category) {
            let filter_array = this.current_category.split('-')[1].split('.')
            let dataset_array = product.dataset.categoryId.split('-')[1].split('.')
            for (let i = 0; i < filter_array.length; i++) {
                if (filter_array[i] !== dataset_array[i]) {
                    return false
                }
            }
        }
        if (this.current_brand.length > 0) {
            if (!this.current_brand.includes(product.dataset.brand)) {
                return false
            }
        }
        return true
    },
    filter: function () {
        let products = document.querySelectorAll('.product-wrapper')
        for (let product of products) {
            if (!this.filterProduct(product)) {
                product.style.display = 'none'
            } else {
                product.style.display = 'flex'
            }
        }

    }
}
filter.setEvents()
let urlParams = new URLSearchParams(window.location.search);
let brand_value = urlParams.get('brand');
let category_value = urlParams.get('category');
if (brand_value) {
    brandDOM = document.querySelector(`label[for="${brand_value}"]`)
    brandDOM.querySelector('input').checked = true
    brandDOM.querySelector('.stlcheck').classList.add('stlcheck2')
    filter.current_brand.push(brand_value)
}
if (category_value) {
    categoryDOM = document.querySelector(`#category-${category_value}`)
    categoryDOM.children[0].classList.add('selected')
    filter.current_category = categoryDOM.id
}

if (brand_value || category_value) {
    filter.filter()
}

function tehSort(dataset_teh) {
    let elements = document.querySelectorAll('.teh-info div')
    for (let el of elements) {
        if (el.dataset.tehId === dataset_teh || !dataset_teh) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none'
        }
    }
}

function callButton1() {
    document.getElementById("hideButton1").classList.toggle("main-form-container");
}

function colorButton1() {
    document.getElementById("boxWhite").classList.toggle("boxWhite2");
}

function colorButton2() {
    document.getElementById("boxBrown").classList.toggle("boxBrown2");
}

function colorButton3() {
    document.getElementById("boxGraphite").classList.toggle("boxGraphite2");
}

function colorButton4() {
    document.getElementById("boxBlack").classList.toggle("boxBlack2");
}

function colorButton5() {
    document.getElementById("boxGold").classList.toggle("boxGold2");
}

function colorButton6() {
    document.getElementById("boxGray").classList.toggle("boxGray2");
}