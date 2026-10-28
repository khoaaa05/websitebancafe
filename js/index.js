let danhmuc = ["nuocuong","banhmi"];
let cf = ds.filter(item => item.loai=="nuocuong");
let bm = ds.filter(item => item.loai=="banhmi");
for (let i = 0; i < bm.length; i++) {
document.getElementById("bm").innerHTML +=
    `<div class="col3">
      <img src="images/${bm[i].hinh}" alt="" />
      <h2>${bm[i].ten}</h2>
      <p>${bm[i].mota}</p>
      <h3>${bm[i].gia}</h3>
      <button class="fm" onclick='detail(${bm[i].id})'  >Mua ngay</button>  
      <!-- <div class="km">Giảm 100%</div> -->
    </div>`
}
for (let i = 0; i < cf.length; i++) {
document.getElementById("cf").innerHTML +=
`<div class="col3">
  <img src="images/${cf[i].hinh}" alt="" />
  <h2>${cf[i].ten}</h2>
  <p>${cf[i].mota}</p>
  <h3>${cf[i].gia}</h3>
  <button class="fm" onclick='detail(${cf[i].id})'  >Mua ngay</button>
  <!-- <div class="km">Giảm 100%</div> -->
</div>`

}
ds.forEach(item => {
document.getElementById("show").innerHTML += 
`<div class="col3">
  <img src="images/${item.hinh}" alt="" />
  <h2>${item.ten}</h2>
  <p>${item.mota}</p>
  <h3>${item.gia}</h3>
  <button class="fm" onclick='detail(${item.id})'  >Mua ngay</button>
  <!-- <div class="km">Giảm 100%</div> -->
</div>`
});
function detail(id) {
    window.location.href = `detail.html?id=${id}`;
}