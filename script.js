const send_button = document.getElementById('send-btn');
const inputsPrice = document.getElementsByClassName('ingredient');
const quantity = document.getElementsByClassName('quantity');
const elementSugar =document.getElementById('sugar');
const allSelect = document.getElementsByTagName('select');
const setResults = document.getElementById('results');
const getSpans =document.getElementsByClassName('unit');
const getFooter  = document.querySelector('footer');
const getBuildCakes = document.querySelector('.buildCakes');
let newArray = [];

function buidResult(){
  const equalArray = [];
[...getSpans].forEach((e)=>{
  if (e.innerHTML==='Kg' || e.innerHTML==='L'){
    equalArray.push(1/1000)
  }
  if(e.innerHTML==='cart'){
    equalArray.push(1/30)
  }
  if(e.innerHTML==='cx'){
    equalArray.push(1/200)
  }
  
})
return equalArray;
}


const cup =[160,120,200,0,160,0,90,0,0,0]
const spool =[12,2.5,4,0,0,5,9,5,0,0]
const cart = [0,0,0,1,0,0,0,0,0,0]
const box = [0,0,0,0,0,0,0,0,1000,200]

console.log(buidResult())




//   function measures(){
//   const equalArray = [];
  

//   for (index=0;index<allSelect.length;index++){
//     if (allSelect[index].value==='cup'){
//       equalArray.push(Number(cup[index])/1000) 
//     }else if(allSelect[index].value ==='spool'){
//       equalArray.push(Number(spool[index])/1000)
//     }else if (allSelect[index].value === 'unit'){
//       equalArray.push(Number(((cart[index]/30)).toFixed(2)) )
//     }else if(allSelect[index].value === 'box'){
//       equalArray.push(Number(((box[index])/1000).toFixed(2)) )
//     }
//     }
//     return equalArray;
//   }




function totalPrice(event){
  event.preventDefault();
  
  const cakeName = document.querySelector('#ck-nm').value;

  let total =0;
  for(let i=0;i<inputsPrice.length;i++){
    total +=Number(inputsPrice[i].value)*Number(quantity[i].value)*buidResult()[i];
    console.log(total)
  }
  const obj = {
    name : cakeName,
    price : total
  }
 
  if(JSON.parse(localStorage.getItem('cakeValue'))!==null){
    newArray = JSON.parse(localStorage.getItem('cakeValue'));
  }
  newArray.push(obj)
 
  localStorage.setItem('cakeValue',JSON.stringify(newArray));
  
  
  if(document.getElementsByTagName('p')[0]===undefined){
  const elementCreated = document.createElement('p');
  elementCreated.innerHTML=`O valor total do bolo será ${total.toFixed(2)}`
  setResults.appendChild(elementCreated);
  }else{
    document.getElementsByTagName('p')[0].remove()
    const elementCreated = document.createElement('p');
  elementCreated.innerHTML=`O valor total do bolo será ${total.toFixed(2)}`
  setResults.appendChild(elementCreated); 
  } 
}

function initialRenderization(){
  const makeCakes =JSON.parse(localStorage.getItem('cakeValue'));
  console.log(makeCakes)
  if(makeCakes===null || makeCakes===undefined){
    localStorage.setItem('cakeValue',JSON.stringify([]));
  }else{
    
    [...makeCakes].forEach((e)=>{
    const buildFooter = document.createElement('li')
    buildFooter.classList.add('nameList');
    buildFooter.innerText = `O nome do bolo é ${e.name} cujo custo de produção é ${e.price.toFixed(2)} e o valor de venda é ${(1.3*e.price).toFixed(2)}`
    getBuildCakes.appendChild(buildFooter)  
    })

  }
 
  
  
}



 
 













send_button.addEventListener('click',totalPrice);







window.onload = initialRenderization();




