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
    apiFirebase.signIn();
}

var addFeatured = {
    addColumn() {
       hideFeatured.hideModal();
    
        $('#add-item_form').html(modal(["new-col"], 'Thêm cột', 'addFeatured.addColumnToDB'));
    },
    addRow() {
       hideFeatured.hideModal();
    
        $('#add-item_form').html(modal(products.columns, 'Thêm Item', 'addFeatured.addRowToDB'));
    },
    addColumnToDB(event) {
        const formData = event.parentNode.parentNode.querySelector('[Name]');
        const  formValue = formData.value;
        products.columns.push(formValue);
        products.data = products.data.map(item => item.concat(''));
        
       createFeatured.createGridTable(products);
       addFeatured.addDataToDB(products);
    
    },
    addRowToDB(event) {
        const formData = event.parentNode.parentNode.querySelectorAll('[Name]');
        let initialArray = [...formData].map((el, index) => {
           return el.value;
        });
        initialArray.unshift(false);
        initialArray.unshift('');
        products.data.push(initialArray);
    
        createFeatured.createGridTable(products);
        addFeatured.addDataToDB(products);
    },
    addToDeleteList(event) {
        const index = Number(event.id.replace('checkbox-','')) - 1;
        deleteList = removeDuplicate(deleteList);
        if (event.checked) {
            if (event.id === "checkbox-all") {
    
                deleteList = [];
                $('.checkbox-table-2').each(function() {
                    deleteList.push(Number(this.id.replace('checkbox-','')) - 1);
                })
                showFeatured.showDeleteButton();
                addFeatured.addDataToDB(products);
    
                return;
            }
    
            deleteList.push(index);
            showFeatured.showDeleteButton();
            addFeatured.addDataToDB(products);
    
            return;
        }
    
        if (event.id === "checkbox-all") {
            deleteList = [];
            showFeatured.showDeleteButton();
            addFeatured.addDataToDB(products);
            
            return;
        }
        
        deleteList.splice(deleteList.indexOf(index),1);
    
        showFeatured.showDeleteButton();
        addFeatured.addDataToDB(products);

        return;
    },
    addDataToDB(dataProducts) {
        const uid = apiFirebase.getLogin().uid;
        database.ref('table/' + uid).set({
            columns: dataProducts.columns,
            data: dataProducts.data
        });
    },
    addItemByTypeBox(event) {
        const colIndex = Number(event.getAttribute('data-col')) - 1;
        const rowIndex = Number(event.getAttribute('data-row')) - 1;
        const text = event.innerText;
        if (text !== products.data[rowIndex][colIndex]) {
            database.ref('table/' + auth.currentUser.uid + `/data/${rowIndex}/${colIndex}`).set(text);
            products.data[rowIndex][colIndex] = text;
        }
    },
    changeColumnValue(event) {
        const colIndex = Number(event.getAttribute('data-col')) - 1;
        const text = event.innerText;
        if (text !== products.columns[colIndex]) {
            database.ref('table/' + auth.currentUser.uid + `/columns/${colIndex}`).set(text);
            products.columns[colIndex] = text;
        }
    }
}

var createFeatured = {
    createGridTable(dataProducts) {
        const list = dataProducts.columns;
        const items = dataProducts.data;
        
        const itemsConvert = items.map((item, index)=> {
            const checkboxIndex = index;
            return `
            <tr id="row-${checkboxIndex + 1}" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                ${item.map((data, index) => {
                    if (index === 1) {
                        return `
                        <td class="p-4 w-4 border-r-[1px] border-[#e5e7eb]">
                            <div class="flex items-center">
                                <input 
                                    onChange="addFeatured.addToDeleteList(this)" 
                                    id="checkbox-${checkboxIndex + 1}" 
                                    type="checkbox" 
                                    class="checkbox-table-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                                        dark:bg-gray-700 dark:border-gray-600"
                                >
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
                    <td 
                        data-col="${index + 1}" 
                        data-row="${checkboxIndex + 1}" 
                        onfocusout="addFeatured.addItemByTypeBox(this)" 
                        contentEditable="true" 
                        class="max-w-[190px] border-r-[1px] outline-[#15803d] align-text-top whitespace-normal border-[#e5e7eb]
                            py-2 px-2 text-sm font-medium text-gray-900  dark:text-white"
                    >
                        ${data}
                    </td>
                    `
                }).join('')}
            </tr>`;
            
        }).join('')
        + `
            <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
               <td class="p-4 w-4">
                    <button onClick="addFeatured.addRow()">  
                    <i class="fa fa-plus"></i>
                    </button>
               </td>
            </tr>
        `;
    
        const listConvert =  list.map((item, index)=> { 
                if (item === 'Select') {
                    return `
                    <th scope="col" class="p-4 border-r-[1px] border-[#e5e7eb]">
                        <div class="flex items-center">
                            <input 
                                id="checkbox-all" 
                                onChange="checkboxAll(this)" 
                                type="checkbox" 
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600
                                    dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label for="checkbox-all" class="sr-only">${item}</label>
                        </div>
                    </th>
                    `;
                } else if (!index) {
                    return `
                    <th 
                        scope="col" 
                        id="add-column" 
                        class=" border-r-[1px] border-[#e5e7eb] p-2 py-2 px-2 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <h1>${item}</h1>
                    </th>
                    `
                }
        
                return `
                <th class=" border-r-[1px] border-[#e5e7eb] relative py-2 px-2 text-left min-w-[170px] text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white z-10">
                    <div class="open-column_option flex flex-row justify-between "  >
                        <p 
                            contentEditable="true"                        
                            class="px-[100px] py-2 text-center pl-0 outline-[#15803d] max-w-[120px]"
                            data-col="${index + 1}" 
                            onfocusout="addFeatured.changeColumnValue(this)"
                        > ${item} </p>
                        <span class="ml-2 p-2 pl-4" onClick="showFeatured.showColumnOption(this)" id="col-${index + 1}">
                            <i id="angleDown-${index + 1}"  class="fa fa-angle-down "></i>
                            <i id="angleUp-${index + 1}" style="display:none;" class="fa fa-angle-up "></i>
                        </span>
                    </div>
    
                    <div class="w-fit  bg-white shadow rounded absolute hidden  ring-4 ring-gray-300 z-50 col_option" id="col-${index + 1}_option">
                        <div class="w-full p-3 text-sm">
                            <input 
                                type="text" 
                                class="border-[#1d4ed8] border-2 rounded-lg p-2" 
                                placeholder="Tìm kiếm..."  id="filter-column-${index + 1}" 
                                onkeyup="filterContain(this, ${index + 1})" 
                            />
                        </div>
                        <div class="w-full p-3 text-sm" id="sort-column-${index + 1}" active="on" onclick="toggleSorted(this)">Sort</div>
                        <div class="w-full p-3 text-sm" id="delete-column-${index + 1}" onclick="deleteFeatured.deleteColumn(this)">Delete<span class="ml-2"><i class="fa  fa-trash"></i></span></div>
                    </div>
                </th>
                `;
        }).join('') 
        + ` 
            <th scope="col" id="add-column" class="p-4 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <button onClick="addFeatured.addColumn()">  
                <i class="fa fa-plus"></i>
              </button>
            </th>
        `;
    
        $('#table-list tr').html(listConvert);
        $('#table-items').html(itemsConvert);
    },
    setProfile(user, background) {
        const html = `
                <div class="mt-4 mb-10  flex flex-wrap items-center  justify-center  ">
                    <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                        <div class=" h-32 overflow-hidden" >
                            <img 
                                id="background" 
                                class="w-full" 
                                src="${ background || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkS1NjabAII_UBuUN0VuEO7BaUjcx7wOP1Jg&usqp=CAU'}" 
                                alt="" 
                                onclick="showFeatured.showUploadImageModal()"
                            />
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
        $('.main').prepend(html);
    }
}

var showFeatured = {
    showDeleteButton() {
        if (deleteList.length) {
            $('.delete-row').removeClass('hidden');
            return;
        }

        $('.delete-row').addClass('hidden');
        return;
    },
    showColumnOption(event) {
        const select = `#${event.id}_option`;
        const relativeIndex = event.id.replace('col-','');
        $(`#angleDown-${relativeIndex}`).toggle();
        $(`#angleUp-${relativeIndex}`).toggle();
        $(select).toggle();
    },
    showUploadImageModal() {
        uploadModal();
    }
}

var hideFeatured = {
    hideModal() {
        $('#add-item_form').html(' ');
    }
}

var deleteFeatured = {
    deleteRow() {
        const initialDeleteList = new Set(deleteList);
        products.data = products.data.filter((item, i) => !initialDeleteList.has(i));
        $('.delete-row').addClass('hidden');
    
        createFeatured.createGridTable(products);
    
        deleteList = [];
    
        const length = products.data.length;
        const uid = apiFirebase.getLogin().uid;
        if (!length) {

            const dataForEmpty = products.columns.map(item => {
                if (item === 'STT') return "";
                else if (item === "Select") return false;
                return ""
            });

            database.ref('table/' + uid).set({ columns: products.columns, data: [dataForEmpty] });
        } else addFeatured.addDataToDB(products);
    },
    deleteColumn(event) {
        const index = Number(event.id.replace('delete-column-','')) - 1;
    
        products.columns.splice(index, 1);
        products.data = products.data.map(item => {
            let initialArray = item;
            initialArray.splice(index, 1);
            
            return initialArray;
        });
        createFeatured.createGridTable(products);
        addFeatured.addDataToDB(products);
    
    },
    addAllToDeleteList() {
        products.data.forEach((item, index) => deleteList.push(index));
        deleteList = removeDuplicate(deleteList);
    }
}

//Function handle

function checkboxAll(event) {
    if (event.checked) {
        $('.checkbox-table-2').each(function() {
            this.checked = true;
        });

        deleteFeatured.addAllToDeleteList();
        showFeatured.showDeleteButton();

    } else {
        $('.checkbox-table-2').each(function() {
            this.checked = false;
        });
        deleteList = [];
    }

}

function removeDuplicate(arr) {
    return [...new Set(arr)];
}

function exportTable(fileName = 'Cho mày') {
    JSONToCSVConvertor(
        convertDataToExport(products).rawData, 
        fileName,
        true
    )
}

//ADD event for elements


    $('#login-button').click(function() {
        apiFirebase.signIn();
     })
     
     $('#logout-button').click(function() {
         apiFirebase.signOut();
         location.reload();
     });
     
     $('#add-column button').click(function() {
        addFeatured.addColumn();
     });
     
     $('#delete-row_button').click(deleteFeatured.deleteRow);
     
     $('.exportTable button').click(function() {
         const fileNameInput = $('#fileName').val();
         const fileName = fileNameInput ? fileNameInput : 'Cho mày';
         exportTable(fileName);
     });

function changeState(state) {
    $('#login-button').addClass('hidden');
    $('#logout-button').removeClass('hidden');
}

auth.onAuthStateChanged((user) => {
    if (user) {
        changeState();

        let uid = apiFirebase.getLogin().uid;

        database.ref('table/' + uid).once('value', snap => {
            if ( snap.val() ) getProduct();      
            else database.ref('table/' + uid).set({columns: ['STT', 'Select'], data: [['', false]] });
        }).then(res => {
            getProduct();
        })

        firebase.storage().ref('img/'+ auth.currentUser.uid + '/background')
            .getDownloadURL()
            .then(url => {
                createFeatured.setProfile(user, url)
            }).catch(err => {
                createFeatured.setProfile(user)
            })
        $('.exportTable').removeClass('hidden');
    }
});



