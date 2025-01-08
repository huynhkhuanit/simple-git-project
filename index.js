const { Random } = require('random-js');
const simpleGit = require('simple-git');
const jsonfile = require('jsonfile');
const moment = require('moment');

const filePath = './data.json';
const git = simpleGit();
const random = new Random();

// Tạo dữ liệu ngẫu nhiên và ghi vào file data.json
function createRandomData() {
    const data = {
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        value: random.integer(1, 100) // Sử dụng random-js để tạo số nguyên ngẫu nhiên
    };

    jsonfile.writeFile(filePath, data, { spaces: 2 }, (err) => {
        if (err) console.error('Lỗi khi ghi file:', err);
        else console.log('Dữ liệu mới được lưu:', data);

        // Tự động commit và push sau khi ghi dữ liệu
        commitAndPush();
    });
}

// Tự động commit và push dữ liệu
function commitAndPush() {
    git.add(filePath)
        .then(() => git.commit(`Update data.json at ${moment().format('YYYY-MM-DD HH:mm:ss')}`))
        .then(() => git.push('origin', 'main'))
        .catch((err) => console.error('Lỗi khi thực hiện commit/push:', err));
}

// Chạy hàm tạo dữ liệu
createRandomData();
