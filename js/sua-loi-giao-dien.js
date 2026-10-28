// Bo sung giao dien bang JavaScript thuan - KHONG sua cac file JS goc.
function layGioHang() {
  try {
    var data = JSON.parse(localStorage.getItem('giohang_Storage') || '[]');
    if (Array.isArray(data)) return data;
  } catch (e) {}
  return [];
}
function luuGioHang(gio) {
  localStorage.setItem('giohang_Storage', JSON.stringify(gio));
  capNhatSoLuong();
}
function capNhatSoLuong() {
  var gio = layGioHang();
  var dem = 0;
  for (var i = 0; i < gio.length; i++) dem += Number(gio[i].sl) || 1;
  var hienThi = document.getElementById('cart-count');
  if (hienThi) {
    hienThi.innerText = dem;
    hienThi.hidden = dem === 0;
  }
}
function themSanPham(id) {
  var sp = null;
  for (var i = 0; i < ds.length; i++) {
    if (Number(ds[i].id) === Number(id)) { sp = ds[i]; break; }
  }
  if (!sp) return false;
  var gio = layGioHang();
  var daCo = false;
  for (var j = 0; j < gio.length; j++) {
    if (Number(gio[j].id) === Number(id)) {
      gio[j].sl = (Number(gio[j].sl) || 0) + 1;
      daCo = true;
      break;
    }
  }
  if (!daCo) gio.push({ id: sp.id, ten: sp.ten, gia: sp.gia, hinh: sp.hinh, loai: sp.loai, mota: sp.mota, sl: 1 });
  luuGioHang(gio);
  return true;
}
function hienThiGioHang() {
  var bang = document.getElementById('addCart');
  if (!bang) return;
  var gio = layGioHang();
  var tong = 0;
  var html = '';
  for (var i = 0; i < gio.length; i++) {
    var sp = gio[i];
    var sl = Number(sp.sl) || 1;
    var gia = Number(sp.gia) || 0;
    tong += sl * gia;
    html += '<tr><td><div class="cart-product"><img src="images/' + sp.hinh + '" alt=""><span>' + sp.ten + '</span></div></td>';
    html += '<td>' + gia.toLocaleString('vi-VN') + 'đ</td>';
    html += '<td><span class="cart-quantity">' + sl + '</span></td>';
    html += '<td>' + (sl * gia).toLocaleString('vi-VN') + 'đ</td>';
    html += '<td><button type="button" class="remove-product" onclick="xoaSanPham(' + i + ')">Xóa</button></td></tr>';
  }
  bang.innerHTML = html;
  document.getElementById('tongtien').innerText = tong.toLocaleString('vi-VN') + 'đ';
  var rong = document.getElementById('empty-cart');
  if (rong) rong.hidden = gio.length !== 0;
  var nut = document.getElementById('checkout-button');
  if (nut) nut.disabled = gio.length === 0;
  capNhatSoLuong();
}
function doiSoLuong(i, thayDoi) {
  var gio = layGioHang();
  if (!gio[i]) return;
  gio[i].sl = (Number(gio[i].sl) || 1) + thayDoi;
  if (gio[i].sl <= 0) gio.splice(i, 1);
  luuGioHang(gio);
  hienThiGioHang();
}
function xoaSanPham(i) {
  var gio = layGioHang();
  gio.splice(i, 1);
  luuGioHang(gio);
  hienThiGioHang();
}
capNhatSoLuong();
if (document.getElementById('addCart')) {
  hienThiGioHang();
  var nutGoiY = document.getElementsByClassName('suggest-plus');
  for (var a = 0; a < nutGoiY.length; a++) {
    nutGoiY[a].onclick = function () {
      themSanPham(this.getAttribute('data-product-id'));
      hienThiGioHang();
    };
  }
  var thanhToan = document.getElementById('checkout-button');
  if (thanhToan) thanhToan.onclick = function () {
    if (layGioHang().length > 0) alert('Giỏ hàng đã sẵn sàng. Website hiện chưa có hệ thống xử lý thanh toán trực tuyến.');
  };
}
if (document.getElementById('add-to-cart')) {
  var params = new URLSearchParams(window.location.search);
  var ma = Number(params.get('id'));
  document.getElementById('add-to-cart').onclick = function () {
    if (themSanPham(ma)) document.getElementById('purchase-message').innerText = 'Đã thêm sản phẩm vào giỏ hàng.';
  };
  document.getElementById('buy-now').onclick = function () {
    if (themSanPham(ma)) window.location.href = 'cart.html';
  };
}


function dinhDangGiaTriTien(giaTri) {
  var so = Number(String(giaTri).replace(/[^0-9]/g, ''));
  if (!isNaN(so) && so > 0) return so.toLocaleString('vi-VN') + 'đ';
  return String(giaTri || '').trim();
}
function layLoaiHienThi(item, tenMuc) {
  if (item && item.loai === 'banhmi') return 'Bánh mì';
  if (item && item.loai === 'nuocuong') return 'Nước uống';
  if (tenMuc === 'bm') return 'Bánh mì';
  return 'Nước uống';
}
function timSanPhamTheoId(id) {
  if (!Array.isArray(ds)) return null;
  for (var i = 0; i < ds.length; i++) {
    if (Number(ds[i].id) === Number(id)) return ds[i];
  }
  return null;
}
function thongBaoTrangChu(noiDung) {
  var tb = document.getElementById('cart-notice');
  if (!tb) return;
  tb.innerText = noiDung;
  tb.hidden = false;
  clearTimeout(window.__chonCafeNoticeTimer);
  window.__chonCafeNoticeTimer = setTimeout(function () {
    tb.hidden = true;
  }, 2200);
}
function taoDauMucSanPham() {
  var sanPham = document.getElementById('san-pham');
  if (sanPham) {
    var heading = sanPham.querySelector('.catalog-heading');
    if (heading && !heading.parentNode.classList.contains('product-section-head')) {
      heading.innerText = 'SẢN PHẨM';
      var wrap = document.createElement('div');
      wrap.className = 'product-section-head';
      heading.parentNode.insertBefore(wrap, heading);
      wrap.appendChild(heading);
      var link = document.createElement('a');
      link.className = 'product-section-link';
      link.href = 'index.HTML#cf';
      link.innerText = 'Xem tất cả sản phẩm';
      wrap.appendChild(link);
    }
  }
  var bm = document.getElementById('bm');
  if (bm && bm.parentNode && bm.parentNode.classList.contains('container')) {
    bm.parentNode.id = 'bm-section';
  }
}
function chuyenDoiCardTrongMuc(tenMuc) {
  var box = document.getElementById(tenMuc);
  if (!box) return;
  var cards = box.querySelectorAll(':scope > .col3');
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.getAttribute('data-ui-ready') === '1') continue;
    var img = card.querySelector('img');
    var h2 = card.querySelector('h2');
    var p = card.querySelector('p');
    var h3 = card.querySelector('h3');
    var btn = card.querySelector('button');
    var id = 0;
    if (btn) {
      var onclickText = btn.getAttribute('onclick') || '';
      var match = onclickText.match(/detail\((\d+)\)/);
      if (match) id = Number(match[1]);
    }
    var item = timSanPhamTheoId(id);
    var ten = h2 ? h2.textContent.trim() : '';
    var moTa = p ? p.textContent.trim() : '';
    var gia = h3 ? h3.textContent.trim() : '';
    var loai = layLoaiHienThi(item, tenMuc);
    var href = 'detail.html?id=' + id;
    var hinh = img ? img.getAttribute('src') : '';
    var alt = img && img.getAttribute('alt') ? img.getAttribute('alt') : ten;

    var html = '';
    html += '<a class="home-product-thumb" href="' + href + '">';
    html += '<img src="' + hinh + '" alt="' + alt.replace(/"/g, '&quot;') + '">';
    html += '</a>';
    html += '<div class="home-product-body">';
    html += '<a class="home-product-name" href="' + href + '">' + ten + '</a>';
    html += '<p class="home-product-type">' + loai + '</p>';
    html += '<p class="home-product-desc">' + moTa + '</p>';
    html += '<div class="home-product-bottom">';
    html += '<div class="home-product-price">' + dinhDangGiaTriTien(gia) + '</div>';
    html += '<button type="button" class="home-product-plus" data-id="' + id + '" aria-label="Thêm ' + ten.replace(/"/g, '&quot;') + ' vào giỏ hàng">+</button>';
    html += '</div></div>';

    card.innerHTML = html;
    card.setAttribute('data-ui-ready', '1');
  }
  var plusButtons = box.querySelectorAll('.home-product-plus');
  for (var j = 0; j < plusButtons.length; j++) {
    plusButtons[j].onclick = function () {
      var id = Number(this.getAttribute('data-id'));
      if (themSanPham(id)) {
        thongBaoTrangChu('Đã thêm sản phẩm vào giỏ hàng.');
      }
    };
  }
}
function lamDepCardTrangChu() {
  taoDauMucSanPham();
  chuyenDoiCardTrongMuc('show');
  chuyenDoiCardTrongMuc('cf');
  chuyenDoiCardTrongMuc('bm');
}
if (document.getElementById('show')) {
  lamDepCardTrangChu();
}
