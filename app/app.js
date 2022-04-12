//              ************************************
//              ////////////////////////////////////
//             //                                //
//            //    App create by TheZoo        //
//           //                                //
//          ////////////////////////////////////
//         ||||||||||||||||||||||||||||||||||||

var config = {
    apiKey: "AIzaSyAXfPJoBZzAU51An5YgW0FksBVsHY_yU8M",
    authDomain: "excel-mange.firebaseapp.com",
    databaseURL: "https://excel-mange-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "excel-mange",
    storageBucket: "excel-mange.appspot.com",
    messagingSenderId: "893388233221",
    appId: "1:893388233221:web:3ec687bdbbca2d5b4ada6c",
    measurementId: "G-3T56NEMFHB"
};
firebase.initializeApp(config)
//Real time database

var database = firebase.database();

//Firestore

var firestore = firebase.firestore();

//User auth

const auth = firebase.auth();

//Some api for firebase by me 

const apiFirebase = new API_Firebase(firebase);

let products = {};
let deleteList = [];

function signIn() {
    apiFirebase.signIn()
}

function createGridTable(dataProducts) {
    const list = dataProducts.columns;
    const items = dataProducts.data;
    
    const itemsConvert = items.map((item, index)=> {

        const checkboxIndex = index;
        return `
        <tr id="row-${checkboxIndex + 1}" class="hover:bg-gray-100 dark:hover:bg-gray-700">
            ${item.map((data, index) => {
                if (index === 1) {
                    return `
                    <td class="p-4 w-4">
                        <div class="flex items-center">
                            <input onChange="addToDeleteList(this)" class="checkbox-table-2" id="checkbox-${checkboxIndex + 1}" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-2" class="sr-only">${data}</label>
                        </div>
                    </td>
                    `
                } else if (index === 0) {
                    return  `
                    <td class="p-2 w-2 bg-[#f8f8f8] dark:bg-gray-300 text-center">
                        <span>${checkboxIndex + 1}</span>
                    </td>`
                }
                
                return `
                <td data-col="${index + 1}" class=" py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">${data}</td>
                `
            }).join('')}
        </tr>`;
        
    }).join('')
    + `
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
           <td class="p-4 w-4">
                <button onClick="addRow()">  
                <i class="fa fa-plus"></i>
                </button>
           </td>
        </tr>
    `;

    const listConvert =  list.map((item, index)=> {

            if (item === 'Select') {
                return `
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all" onChange="checkboxAll(this)" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all" class="sr-only">${item}</label>
                    </div>
                </th>
                `;
            } else if (!index) {
                return `
                <th scope="col" id="add-column" class="p-2 py-2 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <h1>${item}</h1>
                </th>
                `
            }
    
            return `
            <th class="relative py-4 px-6 text-left text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white z-10">
                <div class="open-column_option" onClick="showColumnOption(this)" id="col-${index + 1}">
                    ${item} 
                    <span class="ml-2">
                        <i id="angleDown-${index + 1}"  class="fa fa-angle-down "></i>
                        <i id="angleUp-${index + 1}" style="display:none;" class="fa fa-angle-up "></i>
                    </span>
                </div>

                <div class="w-fit  bg-white shadow rounded absolute hidden  ring-4 ring-gray-300 z-50 col_option" id="col-${index + 1}_option">
                    <div class="w-full p-3 text-sm">
                        <input type="text" class="border-[#1d4ed8] border-2 rounded-lg p-2" placeholder="Tìm kiếm..."  id="filter-column-${index + 1}" onkeyup="filterContain(this, ${index + 1})" />
                    </div>
                    <div class="w-full p-3 text-sm" id="sort-column-${index + 1}" active="on" onclick="toggleSorted(this)">Sort</div>
                    <div class="w-full p-3 text-sm" id="delete-column-${index + 1}" onclick="deleteColumn(this)">Delete<span class="ml-2"><i class="fa  fa-trash"></i></span></div>
                </div>
            </th>
            `;
    }).join('') 
    + ` 
        <th scope="col" id="add-column" class="p-4 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <button onClick="addColumn()">  
            <i class="fa fa-plus"></i>
          </button>
        </th>
    `;

    $('#table-list tr').html(listConvert);
    $('#table-items').html(itemsConvert);
}

function checkboxAll(event) {
    [...$('.checkbox-table-2')].forEach(element => element.checked = event.checked);

    addToDeleteList(event)
}

function setProfile(user) {
    const html = `

            <div class="mt-4 mb-10  flex flex-wrap items-center  justify-center  ">
                <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                    <div class=" h-32 overflow-hidden" >
                        <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div>
                    <div class="flex justify-center px-5  -mt-12">
                        <img class="h-32 w-32 bg-white p-2 rounded-full   " src="${user.photoURL}" alt="" />
    
                    </div>
                    <div class=" ">
                        <div class="text-center px-14">
                            <h2 class="text-gray-800 text-3xl font-bold">${user.displayName}</h2>
                            <p class="text-gray-400 mt-2">@${user.displayName}</p>
                            <p class="mt-2 text-gray-600"><span class="font-bold">Email:</span> ${user.email}</p>
                        </div>
                        <hr class="mt-6" />
                        <div class="flex  bg-gray-50 ">
                            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                <p><span class="font-semibold">2.5 k </span> Tokens</p>
                            </div>
                            <div class="border"></div>
                            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                <p> <span class="font-semibold">2.0 k </span> Remaining</p>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
    `
    $('.main').prepend(html)
}

function addColumn() {
    hideModal()

    $('#add-item_form').html(modal(["new-col"], 'Thêm cột', 'addColumnToDB'))
}

function addRow() {
    hideModal()

    $('#add-item_form').html(modal(products.columns, 'Thêm Item', 'addRowToDB'))
}

function hideModal() {
    $('#add-item_form').html(' ')
}

function addColumnToDB(event) {
    const formData = event.parentNode.parentNode.querySelector('[Name]');
    const  formValue = formData.value;
    products.columns.push(formValue);
    products.data = products.data.map(item => item.concat(''));
    
    createGridTable(products)
    addDataToDB(products)

}

function addRowToDB(event) {
    const formData = event.parentNode.parentNode.querySelectorAll('[Name]');
    let initialArray = [...formData].map((el, index) => {
       return el.value
    });
    initialArray.unshift('')
    initialArray.unshift(false)
    products.data.push(initialArray)

    createGridTable(products)
    addDataToDB(products)
}

function deleteRow() {
    deleteList.forEach(index => {
        products.data.splice(index, 1)

        createGridTable(products)

        $('.delete-row').addClass('hidden')

    })
    addDataToDB(products)

}

function deleteColumn(event) {
    const index = Number(event.id.replace('delete-column-','')) - 1;

    products.columns.splice(index, 1);
    products.data = products.data.map(item => {
        let initialArray = item;
        initialArray.splice(index, 1);
        
        return initialArray
    })
    
    if (products.columns.length < 2) {
        
    }
    createGridTable(products)
    addDataToDB(products)

}

function addToDeleteList(event) {
    const index = Number(event.id.replace('checkbox-','')) - 1;
    if (event.checked) {
        if (event.id === "checkbox-all") {

            deleteList = [];
            $('.checkbox-table-2').each(function() {
                deleteList.push(Number(this.id.replace('checkbox-','')) - 1);
            })
            showDeleteButton();
            addDataToDB(products)

            return;
        }

        deleteList.push(index);
        showDeleteButton();
        addDataToDB(products)

        return;
    }

    if (event.id === "checkbox-all") {
        deleteList = [];
        showDeleteButton();
        addDataToDB(products)
        
        return
    }

    deleteList.splice(deleteList.indexOf(index),1);

    showDeleteButton();

    addDataToDB(products)
    return;
}

function showDeleteButton() {
    if (deleteList.length) {
        $('.delete-row').removeClass('hidden')
        
        return
    }
    $('.delete-row').addClass('hidden')

    return
}

function showColumnOption(event) {
    const select = `#${event.id}_option`;
    const relativeIndex = event.id.replace('col-','');
    $(`#angleDown-${relativeIndex}`).toggle()
    $(`#angleUp-${relativeIndex}`).toggle()
    $(select).toggle()
}

function removeDuplicate(arr) {
    return [...new Set(arr)];
}

function addDataToDB(dataProducts) {
    const uid = apiFirebase.getLogin().uid;
    database.ref('table/' + uid).set({
        columns: dataProducts.columns,
        data: dataProducts.data
    })
   
}

$('#login-button').click(function() {
   apiFirebase.signIn();
})

$('#logout-button').click(function() {
    apiFirebase.signOut();
    location.reload()
})

$('#add-column button').click(function() {
    addColumn()
})

$('#delete-row_button').click(deleteRow)



auth.onAuthStateChanged((user) => {
    if (user) {
        $('#login-button').addClass('hidden');
        $('#logout-button').removeClass('hidden');
        
        const uid = apiFirebase.getLogin().uid;

        database.ref('table/' + uid).once('value', (s)=>{
            if (s.val()) {
                getProduct()     
            } else {
                database.ref('table/' + uid).set({
                    columns: ['STT', 'Select'],
                    data: [
                        ['', false]
                    ]
                })
                setTimeout(getProduct, 2000)
            }

        })
        setProfile(user)
    }
})



