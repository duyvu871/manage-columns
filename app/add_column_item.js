function modal(data, type, evt) {
   return ` 
   <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">${type}</h1>
        <div class="form-data">
            ${!data || data.map((item, index)=> {
                if (item === false) return  
                else if (item == "Select") return
                else if (item === 'STT') return
                return `
                <div class="${item}" class="relative mb-5 mt-2">
                        <label for="${item}-${index}" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">${item}</label>
                        <input id="${item}-${index}" name="${item}-${index}" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-4 text-sm border-gray-300 rounded border" placeholder="Nhập vô nhanh lên MỆT QUÁ ...." />
                </div>
                `
            }).join('')}
        </div>
        <div class="flex items-center justify-start w-full mt-4">
            <button onclick="${evt}(this)" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="modalHandler()">Cancel</button>
        </div>
        <button onClick="hideModal()" class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"  aria-label="close modal" role="button">
            <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    </div>`
}

{/* <div class="relative mb-5 mt-2">
<div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="7" y1="15" x2="7.01" y2="15" />
        <line x1="11" y1="15" x2="13" y2="15" />
    </svg>
</div>
<input id="email2" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border" placeholder="XXXX - XXXX - XXXX - XXXX" />
</div> */}


// const modal = `
// <!-- component -->
// <!-- Code block starts -->
//         <dh-component>
//             <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
//             <div class="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
//                 <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                   
//                 </div>
//             </div>
//             <div class="w-full flex justify-center py-12" id="button">
//                 <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" onclick="modalHandler(true)">Open Modal</button>
//             </div>
//             <script>
//                 let modal = document.getElementById("modal");
//                 function modalHandler(val) {
//                     if (val) {
//                         fadeIn(modal);
//                     } else {
//                         fadeOut(modal);
//                     }
//                 }
//                 function fadeOut(el) {
//                     el.style.opacity = 1;
//                     (function fade() {
//                         if ((el.style.opacity -= 0.1) < 0) {
//                             el.style.display = "none";
//                         } else {
//                             requestAnimationFrame(fade);
//                         }
//                     })();
//                 }
//                 function fadeIn(el, display) {
//                     el.style.opacity = 0;
//                     el.style.display = display || "flex";
//                     (function fade() {
//                         let val = parseFloat(el.style.opacity);
//                         if (!((val += 0.2) > 1)) {
//                             el.style.opacity = val;
//                             requestAnimationFrame(fade);
//                         }
//                     })();
//                 }
//             </script>
            
//         </dh-component>
//         <!-- Code block ends -->
// `