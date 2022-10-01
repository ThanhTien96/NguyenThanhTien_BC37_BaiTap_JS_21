
// hàm tạo đối tượng nhân viên

/**
đối tượng nhân viên cần có các thuộc tính chung:
1. tài khoản
2. Họ và tên
3. email
4. Mật khẩu
5. Ngày tháng năm sinh
6. lương cẳn bản
7. Chức vụ
8. Thời gian làm việc
 */

function staff(account, fullName, email, password, datePicker, salary, position, workingTime) {
    this.account = account;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.datePicker = datePicker;
    this.salary = salary;
    this.position = position;
    this.workingTime = workingTime;

    // ham tính tiền lương
    this.calcSalary = function () {
        // biến tông lương
        var totalSalary = 0;
        if (this.position === 'Sếp') {
            totalSalary = this.salary * 3;
        }else if (this.position === 'Trưởng Phòng') {
            totalSalary = this.salary * 2;
        }else {
            totalSalary = this.salary * 1;
        }
        return totalSalary;
    };

    // hàm đánh giá nhân viên

    this.rank = function () {
        // biến chứa đánh giá nhân viên
        var rank = '';
        if (this.workingTime >= 192) {
            rank = 'Xuất Sắc';
        }else if (this.workingTime >= 176) {
            rank = 'Giỏi';
        }else if (this.workingTime >= 160) {
            rank = 'Khá';
        }else {
            rank = 'Trung Bình';
        }
        return rank;
    }
};