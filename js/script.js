let b1 = document.querySelector('#level1').addEventListener('click', () => {CreateItems(2, 2)} );
let b2 = document.querySelector('#level2').addEventListener('click', () => {CreateItems(4, 2)} );
let b3 = document.querySelector('#level3').addEventListener('click', () => {CreateItems(6, 3)} );

function CreateItems(count, rowcount){
  let mem = {
    hWrap : null, // Dein Spielfeld
    url : "/Memorie_Spiel/images/", 
    sets : count, 
    row : rowcount,
    grid : [], 
    moves : 0, 
    matched : 0,
    last : null, 
    lock : null, 
    hint : 1000, 
  
 
    preload : () => {
     
      mem.hWrap = document.getElementById("mem-game");
  
      let img;
      let loaded = -1;
      for (let i = 0; i <= mem.sets; i++) 
      {
        img = document.createElement("img");
        img.onload = () => {
          loaded++;
          if (loaded == mem.sets) 
          { 
            mem.reset(); 
          }
        };
        img.src = `${mem.url}smiley-${i}.jpg`;
        mem.hWrap.appendChild(img);
        console.log("img is created!");
      }
      
    },
    
    
    

    reset : () => {

      clearTimeout(mem.lock); mem.lock = null;
      mem.moves = 0; mem.matched = 0;
      mem.last = null; mem.grid = [];
      for (let s=1; s<=mem.sets; s++) {
        mem.grid.push(s); mem.grid.push(s);
      }
  

      let current = mem.sets * 2, temp, random;
      while (0 !== current) {
        random = Math.floor(Math.random() * current);
        current -= 1;
        temp = mem.grid[current];
        mem.grid[current] = mem.grid[random];
        mem.grid[random] = temp;
      }
  

      mem.hWrap.innerHTML = "";
      for (let id in mem.grid) {
        let card = document.createElement("img");
        card.className = "mem-card";
        card.src = `${mem.url}smiley-0.jpg`;
        card.onclick = () => { mem.open(card); };
        card.set = mem.grid[id];
        card.open = false;
        mem.hWrap.appendChild(card);
        mem.grid[id] = card;
      }
    },
  
  
    open : (card) => { if (mem.lock == null) { if (!card.open) {

      card.open = true;
      mem.moves++;
      card.src = `${mem.url}smiley-${card.set}.jpg`;
      card.classList.add("open");
  

      if (mem.last == null) { mem.last = card; }
  

      else {

        card.classList.remove("open");
        mem.last.classList.remove("open");
  
      
        if (card.set == mem.last.set) {

          mem.matched++;
          card.classList.add("right");
          mem.last.classList.add("right");
          mem.last = null;
  

          if (mem.matched == mem.sets) {
            alert("YOU WIN! Total klicks: " + mem.moves);
            mem.reset();
          }
        }
  
 
        else {
          card.classList.add("wrong");
          mem.last.classList.add("wrong");
          mem.lock = setTimeout(() => {
            card.classList.remove("wrong");
            mem.last.classList.remove("wrong");
            card.open = false;
            mem.last.open = false;
            card.src = `${mem.url}smiley-0.jpg`;
            mem.last.src = `${mem.url}smiley-0.jpg`;
            mem.last = null;
            mem.lock = null;
          }, mem.hint);
        }
      }
    }}}
  };
  mem.preload();
  console.log("its done!");
}
  


