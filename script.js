let select = document.createElement('select');
        let para = document.createElement('p');

        select.setAttribute('id', 'field');
        let existingId='';
        let div = document.createElement('div');
        let btn = document.createElement('button');
        btn.innerText = 'Back';
        div.classList.add('drop');
        let modal = document.createElement('div');
     
        let contain = document.getElementsByClassName('container');
        let icon = document.getElementsByClassName('tgl');
                let nav = document.getElementsByTagName('nav');
        let toggle = false, val = 0, check, checkvalue,attrVal,input;
        document.body.insertBefore(div, contain[0]);
        let close;
        let arr =[];
                    let sidebar = document.createElement('div');
                    sidebar.classList.add('side');

                    document.body.appendChild(sidebar);
        let bday = document.getElementsByClassName('bday');
        let bdArr;



        api()
        function api() {
            fetch('https://dummyjson.com/users').then((res) => {

                 return res.json()
                }).then((data) => {
                 let aray = ['firstName', 'lastName', 'age', 'gender', 'email', 'company name', 'birthDate', 'company title', 'country', 'university', 'department'];
                 aray.sort();

                 let sel = aray.map((e) => {
                    return `<option>${e.toUpperCase()}</option>`
                 })
                 sel.unshift(`<option hidden>Select</option>`);
                 select.innerHTML = sel.join("");
                 div.appendChild(select);
                 div.innerHTML += `<input id='inp' type='text' placeholder='' disabled></input> `


                     
                    let user = data.users
                 bdArr=getBdayInfo(user);
                    getAllKeys()
                    function getAllKeys(obj, prefix = '', keys = new Set()) {
                    for (const key in obj) {
                        const value = obj[key];
                        const fullKey = prefix ? `${prefix}.${key}` : key;

                        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                            // Recurse into nested object
                            getAllKeys(value, fullKey, keys);
                        } else {
                            keys.add(fullKey);
                        }
                    }
                    return keys;
                    }

                

                    const allKey = new Set();

                    user.forEach(u => {
                        getAllKeys(u, '', allKey);
                    });

                    arr=[...allKey];                    
                   bday[0].addEventListener('click',()=>{
                    if(sidebar.classList.contains('sideopen')){
                        sidebar.classList.remove('sideopen');
                        

                    }
                    else{
                        sidebar.classList.add('sideopen');
                        let bdContainer = document.createElement("div");
                        bdContainer.classList.add('bdContain');
                        let pg = document.createElement("p");
                        pg.textContent = 'Monthly Bday Edition';
                        pg.classList.add('bdpara');
                        bdContainer.appendChild(pg);
                        sidebar.appendChild(bdContainer);
                      

                        nav[0].style.position='fixed';
                        nav[0].style.right='20px';
                        nav[0].style.top='50px';

                        let bdaydisplay=bdArr.map((b)=>{
                            let bduser = user[b];
                            return `<div class='bdcards'>
                                <p>Name : ${bduser.firstName} ${bduser.lastName}</p>
                                 <p>Birth Date: ${bduser.birthDate}</p>
                                 <p>Turning: ${calAge(bduser.birthDate)}</p>
                              
                                </div>
                            `;
                        })

                        bdContainer.innerHTML+= bdaydisplay.join('');
                    }
                   })

                    let result = user.map((t) => {

                    return `<div class='users' id=${t[arr[0]]} >
                                                    <div class='arrange'>
                                                    <h5>Name: ${t[arr[1]]} ${t[arr[2]]} </h5>
                                                    <img src=${t[arr[11]]}>
                                                    </div>
                                                    <div class='arrange'>
                                                        <h5>Age: ${arr[4].includes('.')?insertKeys(t,t[arr[0]]+1,arr[4]):t[arr[4]]}</h5>
                                                        <h5 class='caps'>Gender: ${arr[5].includes('.')?insertKeys(t,t[arr[0]]+1,arr[5]):t[arr[5]]}</h5>
                                                    </div >
            
                                                    <h5>Email: ${arr[6].includes('.')?insertKeys(t,t[arr[0]]+1,arr[6]):t[arr[6]]} </h5>
                                                    <h5>Phone: ${arr[7].includes('.')?insertKeys(t,t[arr[0]]+1,arr[7]):t[arr[7]]}</h5>
            
                                                <h5>BirthDate: ${arr[10].includes('.')?insertKeys(t,t[arr[0]]+1,arr[10]):t[arr[10]]}</h5>
                                                <h5>Location: ${arr[21].includes('.')?insertKeys(t,t[arr[0]]+1,arr[21]):t[arr[21]]} , ${arr[26].includes('.')?insertKeys(t,t[arr[0]]+1,arr[26]):t[arr[26]]}</h5>
                                                <h5>University: ${arr[28].includes('.')?insertKeys(t,t[arr[0]]+1,arr[28]):t[arr[28]]} </h5>
                                                <h5>Company: ${arr[35].includes('.')?insertKeys(t,t[arr[0]]+1,arr[35]):t[arr[35]]} </h5>
                                                <h5>Department: ${arr[34].includes('.')?insertKeys(t,t[arr[0]]+1,arr[34]):t[arr[34]]} </h5>
                                                <h5>Company Title: ${arr[36].includes('.')?insertKeys(t,t[arr[0]]+1,arr[36]):t[arr[36]]} </h5>

                                                </div>`


                 })

                    contain[0].innerHTML = result.join("");
                        modal.classList.add('cls');
                        contain[0].appendChild(modal);
                        let field = document.getElementById('field');
                        let inp = document.getElementById('inp');                
                            field.addEventListener('change', () => {                     
                    inp.setAttribute('placeholder', field.value);
                    attrVal = field.value;
                    inp.removeAttribute('disabled');

                     inp.addEventListener('change', () => {
                        div.appendChild(btn);
                        btn.style.display = 'block';
                        input =  inp.value;
                        let keyArr = [...allKey]
                        
                        let indx=-1;
                        if(!attrVal.includes(' ')){
                        keyArr.forEach(function(val,index){                            
                           if(val.toLowerCase() == attrVal.toLowerCase() ){
                            indx= index;
                           }
                           

                        })


                        if(indx==-1){
                        keyArr.forEach(function(val,index){                            
                           if(val.toLowerCase().includes(attrVal.toLowerCase()) ){
                            indx= index;
                           }
                           

                        })
                        }
                    }
                    else{
                        let newAttrVal=attrVal.toLowerCase().split(' ').join('.');
                        keyArr.forEach(function(val,index){                            
                           if(val.toLowerCase().includes(newAttrVal.toLowerCase()) ){
                            indx= index;
                           }
                           

                        })
                    }

                        let display = user.map((t) => {
                            let temp = keyArr[indx];
                            let tempVal ;

                            if(temp.includes('.')){
                                tempVal = insertKeys(t,t[arr[0]]+1,arr[indx]);                                
                            }
                            else {
                                tempVal = t[arr[indx]];
                            }
                            
                                if(indx==4)
                                {
                                    if(input == tempVal )
                                    {
                                
                                        return `<div class='users' id=${t[arr[0]]} >
                                                    <div class='arrange'>
                                                    <h5>Name: ${t[arr[1]]} ${t[arr[2]]} </h5>
                                                    <img src=${t[arr[11]]}>
                                                    </div>
                                                    <div class='arrange'>
                                                        <h5>Age: ${arr[4].includes('.')?insertKeys(t,t[arr[0]]+1,arr[4]):t[arr[4]]}</h5>
                                                        <h5 class='caps'>Gender: ${arr[5].includes('.')?insertKeys(t,t[arr[0]]+1,arr[5]):t[arr[5]]}</h5>
                                                    </div >
            
                                                    <h5>Email: ${arr[6].includes('.')?insertKeys(t,t[arr[0]]+1,arr[6]):t[arr[6]]} </h5>
                                                    <h5>Phone: ${arr[7].includes('.')?insertKeys(t,t[arr[0]]+1,arr[7]):t[arr[7]]}</h5>
            
                                                <h5>BirthDate: ${arr[10].includes('.')?insertKeys(t,t[arr[0]]+1,arr[10]):t[arr[10]]}</h5>
                                                <h5>Location: ${arr[21].includes('.')?insertKeys(t,t[arr[0]]+1,arr[21]):t[arr[21]]} , ${arr[26].includes('.')?insertKeys(t,t[arr[0]]+1,arr[26]):t[arr[26]]}</h5>
                                                <h5>University: ${arr[28].includes('.')?insertKeys(t,t[arr[0]]+1,arr[28]):t[arr[28]]} </h5>
                                                <h5>Company: ${arr[35].includes('.')?insertKeys(t,t[arr[0]]+1,arr[35]):t[arr[35]]} </h5>
                                                <h5>Department: ${arr[34].includes('.')?insertKeys(t,t[arr[0]]+1,arr[34]):t[arr[34]]} </h5>
                                                <h5>Company Title: ${arr[36].includes('.')?insertKeys(t,t[arr[0]]+1,arr[36]):t[arr[36]]} </h5>

                                                </div>`
                                    }
                                }

 
                                
                            
                            else if( indx==5 && (input.toLowerCase() == tempVal.toLowerCase()))
                            {

                                 return `<div class='users' id=${t[arr[0]]} >
                                    <div class='arrange'>
                                    <h5>Name: ${t[arr[1]]} ${t[arr[2]]} </h5>
                                    <img src=${t[arr[11]]}>
                                    </div>
                                    <div class='arrange'>
                                    <h5>Age: ${arr[4].includes('.')?insertKeys(t,t[arr[0]]+1,arr[4]):t[arr[4]]}</h5>
                                     <h5 class='caps'>Gender: ${arr[5].includes('.')?insertKeys(t,t[arr[0]]+1,arr[5]):t[arr[5]]}</h5>
                                     </div >
            
                                    <h5>Email: ${arr[6].includes('.')?insertKeys(t,t[arr[0]]+1,arr[6]):t[arr[6]]} </h5>
                                    <h5>Phone: ${arr[7].includes('.')?insertKeys(t,t[arr[0]]+1,arr[7]):t[arr[7]]}</h5>
            
                                    <h5>BirthDate: ${arr[10].includes('.')?insertKeys(t,t[arr[0]]+1,arr[10]):t[arr[10]]}</h5>
                                    <h5>Location: ${arr[21].includes('.')?insertKeys(t,t[arr[0]]+1,arr[21]):t[arr[21]]} , ${arr[26].includes('.')?insertKeys(t,t[arr[0]]+1,arr[26]):t[arr[26]]}</h5>
                                    <h5>University: ${arr[28].includes('.')?insertKeys(t,t[arr[0]]+1,arr[28]):t[arr[28]]} </h5>
                                    <h5>Company: ${arr[35].includes('.')?insertKeys(t,t[arr[0]]+1,arr[35]):t[arr[35]]} </h5>
                                    <h5>Department: ${arr[34].includes('.')?insertKeys(t,t[arr[0]]+1,arr[34]):t[arr[34]]} </h5>
                                    <h5>Company Title: ${arr[36].includes('.')?insertKeys(t,t[arr[0]]+1,arr[36]):t[arr[36]]} </h5>
                                   
                                     </div>`
                            }


                            else if( indx!==5 && ((input.toLowerCase() == tempVal.toLowerCase()) || tempVal.toLowerCase().includes(input.toLowerCase())) )
                            {
                    
                                            return `<div class='users' id=${t[arr[0]]} >
                                        <div class='arrange'>
                                        <h5>Name: ${t[arr[1]]} ${t[arr[2]]} </h5>
                                        <img src=${t[arr[11]]}>
                                        </div>
                                        <div class='arrange'>
                                        <h5>Age: ${arr[4].includes('.')?insertKeys(t,t[arr[0]]+1,arr[4]):t[arr[4]]}</h5>
                                        <h5 class='caps'>Gender: ${arr[5].includes('.')?insertKeys(t,t[arr[0]]+1,arr[5]):t[arr[5]]}</h5>
                                        </div >

                                        <h5>Email: ${arr[6].includes('.')?insertKeys(t,t[arr[0]]+1,arr[6]):t[arr[6]]} </h5>
                                            <h5>Phone: ${arr[7].includes('.')?insertKeys(t,t[arr[0]]+1,arr[7]):t[arr[7]]}</h5>

                                        <h5>BirthDate: ${arr[10].includes('.')?insertKeys(t,t[arr[0]]+1,arr[10]):t[arr[10]]}</h5>
                                        <h5>Location: ${arr[21].includes('.')?insertKeys(t,t[arr[0]]+1,arr[21]):t[arr[21]]} , ${arr[26].includes('.')?insertKeys(t,t[arr[0]]+1,arr[26]):t[arr[26]]}</h5>
                                        <h5>University: ${arr[28].includes('.')?insertKeys(t,t[arr[0]]+1,arr[28]):t[arr[28]]} </h5>
                                        <h5>Company: ${arr[35].includes('.')?insertKeys(t,t[arr[0]]+1,arr[35]):t[arr[35]]} </h5>
                                        <h5>Department: ${arr[34].includes('.')?insertKeys(t,t[arr[0]]+1,arr[34]):t[arr[34]]} </h5>
                                        <h5>Company Title: ${arr[36].includes('.')?insertKeys(t,t[arr[0]]+1,arr[36]):t[arr[36]]} </h5>



                                        </div>`
                            }

                       
                       
                        })
                    


                        contain[0].innerHTML = display.join('');
                         modal.classList.add('cls');
                        contain[0].appendChild(modal);
                        getUserInfo(user);
                        if (toggle == true) { setter(); }

                    });

                })

                        getUserInfo(user);

                btn.addEventListener('click', () => {
                    contain[0].innerHTML = result.join('');
                    btn.style.display = 'none'
                    inp.value = '';
                     modal.classList.add('cls');
                        contain[0].appendChild(modal);
                        getUserInfo(user);
                    if (toggle == true) {
                        setter();
                    }
                })

            })

            


        }

                        function setter() 
                        {
                            let z = document.querySelectorAll('div');
                            for (let i = 0; i < z[1].children.length; i++)
                            {
                                z[1].children[i].classList.remove('users');
                                z[1].children[i].classList.add('dark');
                                z[1].children[i].style.transition = '2s'

                                if(modal.children.length == 2){
                                modal.children[1].classList.add('detailDark');
                                                modal.children[1].style.transition = '2s';

                                        }
                                        if(modal.classList.contains('dark')){
                                            modal.classList.remove('dark');
                                        }
                                modal.classList.add('clsDark');


                                setTimeout(() => {
                                    z[1].children[i].style.transition = '0.7s'
                                    if(modal.children.length == 2){
                                                modal.children[1].style.transition = '0.7s';


                                        }

                                }, 2000)

                            }


                        }

                        function byDefault() 
                        {
                            let z = document.querySelectorAll('div');
                            for (let i = 0; i < z[1].children.length; i++) 
                            {
                                z[1].children[i].classList.remove('dark');

                                z[1].children[i].classList.add('users');
                                modal.classList.remove('clsDark');
                                if(modal.classList.contains('dark')){
                                            modal.classList.remove('dark');
                                        }
                                z[1].children[i].style.transition = '2s'
                                if(modal.children.length == 2){
                                                    modal.children[1].style.transition = '2s'

                                modal.children[1].classList.remove('detailDark');

                                modal.classList.add('users');


                                        }

                                setTimeout(() => {
                                    z[1].children[i].style.transition = '0.7s'
                                    if(modal.children.length == 2){
                                    modal.children[1].style.transition = '0.7s'


                                        }


                                }, 2000)




                            }
                        }

                        icon[0].addEventListener('click', () => {
                            if (toggle == false) {
                                toggle = true;
                                icon[1].style.color = 'white'
                                icon[1].style.display = 'block'
                                icon[0].style.display = 'none'

                                document.body.style.backgroundColor = 'rgb(22, 6, 40)';//'rgb(0, 11, 88)';
                                document.body.style.transition = '3s';


                                setter();

                            }
                        })

                        icon[1].addEventListener('click', () => {
                            if (toggle == true) {
                                toggle = false;
                                icon[1].style.display = 'none'
                                icon[0].style.display = 'block'
                                document.body.style.backgroundColor = 'rgb(211, 222, 220)';
                                document.body.style.transition = '3s';


                                byDefault();
                            }


                        })

                        function insertKeys(t,id,args){
                            let str =args.split('.');
                            str.unshift(Object(t));        
                            let tem = t;
                            for(let i=1;i<str.length;i++){
                                tem =tem[str[i]];
                            }          
                            return tem;

                        }

                        function getBdayInfo(user){
                            let dates = new Date('2024-8-12');
                            let arr=[];
                            let cdm = dates.getMonth()+1;// current date month
                            user.forEach((t)=>{
                                let dob=t.birthDate.split('-');
                                dobMonth = dob[1];
                                if(dobMonth.includes(cdm)){
                                    arr.push(t.id);
                                }

                            });

                                return arr;

                        }


        
                            function getUserInfo(user)
                            {
                                let us = document.querySelectorAll('.users');
                                let existingClose = modal.querySelector('.close');                  
                                    if (!existingClose) {
                                        close = document.createElement('button');
                                        close.innerText = 'close';
                                        modal.appendChild(close);               
                                        close.classList.add('close');
                                        close.style.display = 'block';
                                            close.addEventListener('click',()=>
                                            {
                                                modal.children[1].remove();                                           
                                                modal.style.visibility='hidden';                      
                                                modal.style.width='32%'

                                                modal.classList.add('closing'); 
                                                modal.classList.remove('open');  
                                                modal.style.transition='1.5s';


                                            });

                                        modal.classList.remove('closing');

                                    }
                        
                                us.forEach(elem => 
                                {
                                    elem.addEventListener('click', () => 
                                    {                     
                                            const id = elem.id ;
                                            modal.style.transform= 'translate(-50%,-50%) scaleX(1)';
                                            modal.style.visibility = "visible";
                                            modal.style.width = "70%";
                                            modal.style.transition = "2s";
                                            modal.classList.remove('closing');  

                                            modal.classList.add('open');
                                            if(modal.children.length == 2){
                                                modal.children[1].remove();
                                                
                                            }
                                            let d = user[id-1];                      
                                                    modal.insertAdjacentHTML("beforeend", `<div class='details' id=${d[arr[0]]} >
                                                    <div class='arrange'>
                                                    <h5>Name: ${d[arr[1]]} ${d[arr[2]]} </h5>
                                                    <img src=${d[arr[11]]}>
                                                    </div>
                                                    <div class='arrange'>
                                                    <h5>Age: ${d[arr[4]]}</h5>
                                                    <h5 class='caps'>Gender: ${d[arr[5]]}</h5>
                                                    </div >  
                                                    <h5>Maiden Name: ${d[arr[3]]} </h5>                                                      
                                                    <h5>Email: ${d[arr[6]]} </h5>
                                                    <h5>Phone: ${d[arr[7]]}</h5>           
                                                    <h5>BirthDate: ${d[arr[10]]}</h5>
                                                    <h5>Address: ${arr[19].includes('.')?insertKeys(d,d[arr[0]]+1,arr[19]): d[arr[19]]} </h5>
                                                    <h5>City: ${arr[20].includes('.')?insertKeys(d,d[arr[0]]+1,arr[20]): d[arr[20]]} </h5>                                                    
                                                    <h5>State: ${arr[21].includes('.')?insertKeys(d,d[arr[0]]+1,arr[21]): d[arr[21]]} , ${arr[22].includes('.')?insertKeys(d,d[arr[0]]+1,arr[22]): d[arr[22]]} </h5>                                                                                                      
                                                    <h5>Location: ${arr[21].includes('.')?insertKeys(d,d[arr[0]]+1,arr[21]): d[arr[21]]}  , ${arr[26].includes('.')?insertKeys(d,d[arr[0]]+1,arr[26]): d[arr[26]]} </h5>                                                   
                                                    <h5>University: ${d[arr[28]]} </h5>
                                                    <h5>Company Name: ${arr[35].includes('.')?insertKeys(d,d[arr[0]]+1,arr[35]): d[arr[35]]} </h5>
                                                    <h5>Company Title: ${arr[36].includes('.')?insertKeys(d,d[arr[0]]+1,arr[36]): d[arr[36]]} </h5>
                                                    <h5>Department: ${arr[34].includes('.')?insertKeys(d,d[arr[0]]+1,arr[34]): d[arr[34]]} </h5>
                                                    <h5>Company Address: ${arr[37].includes('.')?insertKeys(d,d[arr[0]]+1,arr[37]): d[arr[37]]} </h5>
                                                    <h5>Company Location: ${arr[38].includes('.')?insertKeys(d,d[arr[0]]+1,arr[38]): d[arr[38]]} , ${arr[44].includes('.')?insertKeys(d,d[arr[0]]+1,arr[44]): d[arr[44]]} </h5>                                                   
                                                    <h5>Username: ${d[arr[8]]} </h5>
                                                    <h5>BloodGroup: ${d[arr[12]]}</h5>                                              
                                                    <h5>Height: ${d[arr[13]]}</h5>
                                                    <h5>Weight: ${d[arr[14]]} </h5>
                                                    <h5>Eye Color: ${d[arr[15]]} </h5>
                                                    <h5>Title: ${arr[36].includes('.')?insertKeys(d,d[arr[0]]+1,arr[36]): d[arr[36]]} </h5>
                                                    <h5>Department: ${arr[34].includes('.')?insertKeys(d,d[arr[0]]+1,arr[34]): d[arr[34]]} </h5>
                                                    <h5>IP: ${d[arr[18]]} </h5>
                                                    <h5>Role: ${d[arr[51]]}</h5>                                                
                                                     </div> 
                                                    `);
                                                    
                                                    if(modal.classList.contains('clsDark')){
                                                        modal.children[1].classList.add('detailDark');

                                                        }  
                                                        modal.children[1].style.transition = "2s";                       
                                    })
                                })


                            }
        
                        function calAge(bdates){
                            let dates = new Date();
                            let bdDates = new Date(bdates);
                            let age = dates.getFullYear() - bdDates.getFullYear();
                            return age;
                        }
