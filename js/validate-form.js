function save() {
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = "";
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("female").value;
  }

  if (_.isEmpty(fullname)) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "x Vui long nhap ho va ten";
  } else {
    document.getElementById("fullname-error").innerHTML = " ";
  }
  if (_.isEmpty(email)) {
    email = "";
    document.getElementById("email-error").innerHTML = "x Vui long nhap email";
  } else {
    document.getElementById("email-error").innerHTML = " ";
  }
  if (_.isEmpty(phone)) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "x Vui long nhap so dien thoai";
  } else {
    document.getElementById("phone-error").innerHTML = " ";
  }
  if (_.isEmpty(address)) {
    address = "";
    document.getElementById("address-error").innerHTML =
      "x Vui long nhap dia chi";
  } else {
    document.getElementById("address-error").innerHTML = " ";
  }
  if (_.isEmpty(gender)) {
    gender = "";
    document.getElementById("gender-error").innerHTML =
      "Vui long chon gioi tinh";
  } else {
    document.getElementById("gender-error").innerHTML = " ";
  }
  //Thêm 1 khách hàng vào table
  if (fullname && email && phone && address && gender) {
    let customers = localStorage.getItem("customers")
      ? JSON.parse(localStorage.getItem("customers"))
      : [];
    customers.push({
      fullname: fullname,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });
    localStorage.setItem("customers", JSON.stringify(customers));
    this.DisplayListCustomer();
  }
}
function DisplayListCustomer() {
  let customers = localStorage.getItem("customers")
    ? JSON.parse(localStorage.getItem("customers"))
    : [];
  if (customers.length === 0) {
    document.getElementById("table").style.display = "none";
    return false;
  }
  document.getElementById("table").style.display = "block";

  let tableContent = `
  <tr>
    <th>#</th>
    <th>Họ và tên</th>
    <th>Email</th>
    <th>Điện thoại</th>
    <th>Địa chỉ</th>
    <th>Giới tính</th>
    <th>Hành động</th>
  </tr>`;
  customers.map((customer, index) => {
    let customerId = index;
    let gt = parseInt(customer.gender) === 1 ? "Nam" : "Nữ";
    index++;
    tableContent += `
    <tr>
      <td>${index}</td>
      <td>${customer.fullname}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.address}</td>
      <td>${gt}</td>
      <td>
          <a href="#" onclick='deleteCustomer(${customerId})'>Delete</a> |
          <a href="#" onclick='GetCustomerById(${customerId})'>Detail</a>
      </td>
    </tr>`;
  });
  document.getElementById("list-customer").innerHTML = tableContent;
}
function deleteCustomer(id) {
  let customers = localStorage.getItem("customers")
    ? JSON.parse(localStorage.getItem("customers"))
    : [];
  customers.splice(id, 1);
  localStorage.setItem("customers", JSON.stringify(customers)); //mới
  DisplayListCustomer();
}
function GetCustomerById(id) {
  let customers = localStorage.getItem("customers")
    ? JSON.parse(localStorage.getItem("customers"))
    : [];
  let filterlist = customers.filter(function (item) {
    return id !== item.id;
  });
  let kq = ``;
  filterlist.map(function (item) {
    kq += `
    <p><b>Họ và tên:</b> ${item.fullname}</p>
    <p><b>Email:</b> ${item.email}</p>
    <p><b>Điện thoại:</b> ${item.phone}</p>
    <p><b>Địa chỉ:</b> ${item.address}</p>
    <p><b>Giới tính:</b> ${item.gender}</p>`;
  });
  document.getElementById("detail-customer").innerHTML = kq;
}

function update() {
  let customers = localStorage.getItem("customers")
    ? JSON.parse(localStorage.getItem("customers"))
    : [];
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  for (let i = 0; i < customers.length; i++) {
    if (email === customers[i].email) {
      if (customers[i].fullname !== fullname) {
        customers[i].fullname = fullname;
      } else if (phone !== customers[i].phone) {
        customers[i].phone = phone;
      } else if (address !== customers[i].address) {
        customers[i].address = address;
      }
    }
  }
  localStorage.setItem("customers", JSON.stringify(customers));
  DisplayListCustomer();
}
function SearchInfo() {
  let customers = localStorage.getItem("customers")
    ? JSON.parse(localStorage.getItem("customers"))
    : [];
  let inputSearch = document.getElementById("myInput").value;
  let newarr = [];
  for (let item of customers) {
    if (item.fullname.toLowerCase().includes(inputSearch.toLowerCase())) {
      newarr.push(item);
    }
  }
  if (newarr !== 0) {
    let kqtimthay = ``;
    newarr.map(function (item) {
      kqtimthay += `
    <table border='1'>
    <tr>
      <th>Họ và tên</th>
      <th>Email</th>
      <th>Điện thoại</th>
      <th>Địa chỉ</th>
      <th>Giới tính</th>
    </tr>
    <tr>
      <td>${item.fullname}</td>
      <td>${item.email}</td>
      <td>${item.phone}</td>
      <td>${item.address}</td>
      <td>${item.gender}</td>
    </tr></table>`;
    });
    document.getElementById("search-customer").innerHTML = kqtimthay;
  }
}
