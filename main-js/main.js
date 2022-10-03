
/**
dự án: Quán lý nhân viên

Người tạo: Nguyễn Thanh Tiến,

Ngày tạo: 25/06/2022

version 1.0
 */

// hàm tạo sinh viên

// hàm getId 
function  getMyId(Id) {
    return document.getElementById(Id);
}

// tạo biến chứa đối tượng nhân viên = array;

var staffList = [];

// 1. viết hàm tạo nhân viên

function creatStaff() {

    // kiểm tra requied nếu không đúng thì return không làm
    var checkValidate = validateForm();

    if (!checkValidate) return;

    // lấy giá trị người dùng nhập vào
    var account = getMyId('account').value;
    var fullName = getMyId('name').value;
    var email = getMyId('email').value;
    var password = getMyId('password').value;
    var datePicker = getMyId('datepicker').value;
    var salary = getMyId('salary').value;
    var position = getMyId('position').value;
    var workingTime = getMyId('workingTime').value;

    //2. chạy vòng lặp qua mảng kiểm tra tài khoản nếu trùng thì thông báo 

    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].account === account) return alert('Tài Khoản Đã Tồn Tại !');
    }
    
    // 3. Tạo nhân viên mới

    var newStaff = new staff(
        account,
        fullName,
        email,
        password,
        datePicker,
        salary,
        position,
        workingTime
    );

    // 4. push vô staffList
    staffList.push(newStaff);

    //5. in danh sách ra giao diện
    renderStaff();

    //6. lưu xuống local storage
    setStaff();


    // đóng modal và reset input

    document.querySelector('#btnDong').click()
    document.querySelector('#staffForm').reset();
}

// hàm render ra giao diện

function renderStaff(data) {
    
    if (!data) data = staffList;
    // tạo biến chứa output
    
    var staffHTML = '';

    // chạy vòng lặp duyệt qua mảng in ra từng nhân viên;

    for (var i = 0; i < data.length; i++) {
        var currentStaff = data[i];

        staffHTML += `<tr>
        <td>${currentStaff.account}</td>
        <td>${currentStaff.fullName}</td>
        <td>${currentStaff.email}</td>
        <td>${currentStaff.datePicker}</td>
        <td>${currentStaff.position}</td>
        <td>${currentStaff.calcSalary().toLocaleString()}</td>
        <td>${currentStaff.rank()}</td>
        <td><button onclick="deleteStaff('${currentStaff.account}')" class="btn btn-danger">Xóa</button>
        <button onclick="getUpdateStaff('${currentStaff.account}')" class="mt-2 btn btn-success">Sửa</button></td>
    </tr>`
    }
    // hiện thị ra giao diện
    getMyId('tableHTML').innerHTML = staffHTML;


}

// setData localStorage

function setStaff() {
    var staffListJSON = JSON.stringify(staffList)

    localStorage.setItem('ST', staffListJSON)
}


// get Data localStorage

function getStaff() {

    var staffListJSON = localStorage.getItem('ST');
    if (!staffListJSON) return;

    // mapdata
    staffList = mapData(JSON.parse(staffListJSON));

    // in ra giao dien

    renderStaff();

}

// gọi hàm getdata chạy 

    
window.onload = function () {
    getStaff();
}



// map data

function mapData(staffListLocal) {
    // tạo 1 mảng mới để hứng giá trị dưới local
    var result = [];

    // lặp qua mảng cũ
    for (var i = 0; i < staffListLocal.length; i++) {
        
        var oldStaff = staffListLocal[i];

        // tạo nhân viên mới
        var newStaff = new staff(
            oldStaff.account,
            oldStaff.fullName,
            oldStaff.email,
            oldStaff.password,
            oldStaff.datePicker,
            oldStaff.salary,
            oldStaff.position,
            oldStaff.workingTime
        );
        result.push(newStaff);

    }
    return result;

}

// find by id

function findByAccount(staffAccount) {

    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].account === staffAccount) {
            return i;
        }
    }
    // không tìm thấy id thì trả về -1
    return -1;

}

// delete staff
function deleteStaff(staffAccount) {

    var index = findByAccount(staffAccount);

    //nếu index là -1 thì thoát ra và thông báo cho người dùng
    if (index === -1) return alert('Mã sinh viên không tồn tại');

    // nếu tìm thấy index thì sẽ tiến hành xóa 

    staffList.splice(index, 1);

    // hiện thị lại giao diên kết quả mới
    renderStaff();

    // xóa dưới localstorage 
    setStaff();

}

// search staff: tìm bằng xếp hạng, tên và tài khoản 

function searchStaff() {
    //dom tới input search
    var keyWord = removeCharacters(getMyId('searchName').value);

    // tạo biến chứa kết quả mới
    var result =  [];

    //chạy vòng lặp qua danh sách sinh viên

    for (var i = 0; i < staffList.length; i++) {
        var staffAccount = removeCharacters(staffList[i].account);
        var staffName = removeCharacters(staffList[i].fullName);
        var staffRank = removeCharacters(staffList[i].rank());
        
        if (staffAccount === keyWord || staffRank.includes(keyWord) || staffName.includes(keyWord)) {
            result.push(staffList[i]);
        }
        
    }
    // render kết quả ra giao diện
    renderStaff(result);

}

// remove characters vietnames;

function removeCharacters(text) {
    if (text === null || text === undefined) return text;
    text = text.toLowerCase();
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    text = text.replace(/đ/g, "d");
    return text;
  }

// hàm update 1:

function getUpdateStaff(staffAccount) {

    // show modal
    document.getElementById('btnThem').click();
    
    //tim id
    var index = findByAccount(staffAccount);
   
    // lum vị trí
    if (index === -1) return alert('Tài Khoản Không tồn tại !!!');

    var staff = staffList[index];

    // đổ thông tin lên input:

    getMyId('account').value = staff.account;
    getMyId('name').value = staff.fullName;
    getMyId('email').value = staff.email;
    getMyId('password').value = staff.password;
    getMyId('datepicker').value = staff.datePicker;
    getMyId('salary').value = staff.salary;
    getMyId('position').value = staff.position;
    getMyId('workingTime').value = staff.workingTime;

    // hiden add button

    getMyId('btnThemNV').style.display = 'none';

    // disable account input
    getMyId('account').disabled = true;

}

// update 2:

function updateStaff() {
     // lấy giá trị người dùng nhập vào
     var account = getMyId('account').value;
     var fullName = getMyId('name').value;
     var email = getMyId('email').value;
     var password = getMyId('password').value;
     var datePicker = getMyId('datepicker').value;
     var salary = getMyId('salary').value;
     var position = getMyId('position').value;
     var workingTime = getMyId('workingTime').value;

    // tìm vị trí index
    var index = findByAccount(account);

    var staff = staffList[index];

    // cập nhật lại toàn bộ thuộc tính 

    staff.fullName = fullName;
    staff.email = email;
    staff.password = password;
    staff.datePicker = datePicker;
    staff.salary = salary;
    staff.position = position;
    staff.workingTime = workingTime;

    //render ra giao diện
    renderStaff();
    // update lại dưới local

    setStaff();
    // reset form
    getMyId('staffForm').reset();
    // hiện nút thêm
    getMyId('btnThemNV').style.display = 'inline-block';
    // đóng ứng modal
    document.querySelector('#btnDong').click(); 
}

// validation form

function validateForm() {

    // get value
    var account = getMyId('account').value;
    var fullName = getMyId('name').value;
    var email = getMyId('email').value;
    var password = getMyId('password').value;
    var datePicker = getMyId('datepicker').value;
    var salary = getMyId('salary').value;
    var position = getMyId('position').value;
    var workingTime = getMyId('workingTime').value;

    var isValidate = true;    

    // gọi hàm requied
    isValidate &= requied(account, 'tbTKNV', '*Trường này không được bỏ trống')
    && length(account, 'tbTKNV', 4, 6);
    isValidate &= requied(fullName, 'tbTen', '*Trường này không được bỏ trống')
    && stringValidate(fullName, 'tbTen');
    isValidate &= requied(email, 'tbEmail', '*Trường này không được bỏ trống')
    && emailValidate(email, 'tbEmail');
    isValidate &= requied(password, 'tbMatKhau', '*Trường này không được bỏ trống')
    && length(password, 'tbMatKhau', 6, 10) 
    && passwordValidate(password, 'tbMatKhau');
    isValidate &= requied(datePicker, 'tbNgay', '*Trường này không được bỏ trống')
    && dateValidate(datePicker, 'tbNgay');
    isValidate &= requied(salary, 'tbLuongCB', '*Trường này không được bỏ trống')
    && salarayValidate(salary, 'tbLuongCB', 1e6, 2e7);
    isValidate &= requied(position, 'tbChucVu', '*Phải chọn chức vụ phù hợp');
    isValidate &= requied(workingTime, 'tbGiolam', '*Trường này không được bỏ trống')
    && workingTimeValidate (workingTime, 'tbGiolam', 80, 200);
    
    
    return isValidate;
    

}

// required: kiem tra dang nhap

function requied(value, tagId, text) {
    var show = getMyId(tagId);
    if (value.length === 0) {
        
        show.style.display = 'inline-block';
        show.innerHTML = text;
        return false;
    }
    show.style.display = 'none';
    show.innerHTML = '';
    return true;
} 

// min length max length requied

function length(value, tagId, min, max) {
    var show = getMyId(tagId);
    if (value.length < min || value.lenght > max) {
        
        show.style.display = 'inline-block';
        show.innerHTML = `*Độ dài phải từ ${min} tới ${max} ký tự`;
        return false;
    }
    show.style.display = 'none';
    show.innerHTML = '';
    return true;

}
// mail validate

function dateValidate(value, tagId) {
    var show = getMyId(tagId);
    var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (pattern.test(value)) {
        show.style.display = 'none';
        show.innerHTML = '';
        return true
    }
    show.style.display = 'inline-block';
    show.innerHTML = '*Vui Lòng nhập đúng đinh dạng mm/dd/yyyy';
    return false;
}

// tringValidate

function stringValidate(value, tagId) {

    var show = getMyId(tagId);

    var pattern = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

    if (!pattern.test(value)) {
        show.style.display = 'inline-block';

        show.innerHTML = '*Tên nhân viên phải là chữ';
        return false;
    }
    show.style.display = 'none';
    show.innerHTML = '';
    return true;
}

// password validate 

function passwordValidate(value, tagId) {
    var show = getMyId(tagId);

    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

    if (!pattern.test(value)) {
        show.style.display = 'inline-block';
        show.innerHTML = 'mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống';
        return false;
    }
    show.style.display = 'none';
    show.innerHTML = '';
    return true;
}

// salary validate

function salarayValidate(value, spanId, numMin, numMax) {

    var show = getMyId(spanId);

    if (Number(value) < numMin || Number(value) > numMax) {
        show.style.display = ' inline-block';
        show.innerHTML = '*Lương cơ bản từ 1.000.000 đến 20.000.000';
        return false;
    }
    show.style.display = 'none';
    show.innerHTML = '';
    return true;
}

// workingTime validate 
function workingTimeValidate (value, tagId, minNum, maxNum) {
    var show = getMyId(tagId);

    if(Number(value) < minNum || Number(value) > maxNum) {
        show.style.display = 'inline-block';
        show.innerHTML = '*Số giờ làm trong tháng phải từ80 đến 200 giờ,';
        return false;

    }
    show.style.display = 'none';
    show.innerHTML = '';
    return true;
}

// email validate

function emailValidate(value, tagId) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var show = getMyId(tagId);

    if (pattern.test(value)) {
        show.style.display = 'none';
        show.innerHTMl = '';
        return true;
    }

    show.style.display = 'inline-block';
    show.innerHTML = '*Ký tự email phải đúng định dạng và có @example.com';
    return false;


}

    


