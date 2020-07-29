const readline = require('readline');

const r = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

r.question("스케쥴링 알고리즘 종류를 적어주세요 : ", type => {
    type = type.toUpperCase();
    switch(type) {
        case "FCFS":
            FCFS(); break;
        case "SSTF":
            SSTF(); break;
        case "SCAN":
            SCAN(); break;
        case "C-SCAN":
            C_SCAN(); break;
        case "LOOK":
            LOOK(); break;
        case "C-LOOK":
            C_LOOK(); break;
        default:
            console.log("입력이 잘못되었습니다.");
    }
})

function FCFS() {
    r.question("현재 헤드의 위치를 입력해주세요", HEAD => {
        if (isNaN(HEAD)) return console.log("숫자가 아닙니다.");


        let first_head = HEAD
        let queue = [];
        let queue_avg = [];
        let tmp = 0;
        console.log("작업 목록을 입력해 주세요 (순서대로)");
        r.question(``, data => {
            queue = data.split(' ');
            queue.forEach((value, index) => {
                if (isNaN(value)) return console.log("입력값 중 숫자가 아닌것이 있습니다");
            });

            queue.forEach((value, index) => {
                if (index == queue.length);
                
    
                queue_avg.push(Math.abs(Diff(HEAD, value)));
                tmp += Math.abs(Diff(HEAD, value));
                HEAD = value;
            });
            console.log(queue_avg);

            console.log("실행 순서 : ", queue);
            console.log("평균 대기 시간 : ", tmp/queue_avg.length);

        });
 
    });
}

function SSTF() {
    r.question("현재 헤드의 위치를 입력해주세요 : ", HEAD => {
        if (isNaN(HEAD)) return console.log("숫자가 아닙니다.");

        let queue = [];
        let queue_run = [];
        let queue_avg = [];
        let header = HEAD;

        console.log("작업 목록을 입력해 주세요");
        r.question('', data => {

            queue = data.split(' ');
            header = queue[0];
            
            queue.forEach((value, index) => {
                if (isNaN(value)) return console.log("입력값 중 숫자가 아닌것이 있습니다.");
            });                

            let length = queue.length;
            for (let i = 0; i < length; i++) {
                let closer = Closer(HEAD, queue, Math.max.apply(null, queue));
                // console.log(closer, HEAD ,'근사값');
                HEAD = closer; 
                queue_run.push(closer);
                queue.splice(queue.indexOf(closer), 1);
            }

            let tmp = 0;
            queue_run.forEach((value, index) => {
                if (index == queue.length);
                
    
                queue_avg.push(Math.abs(Diff(header, value)));
                tmp += Math.abs(Diff(header, value));
                header = value;
            });

            console.log("실행 순서", queue_run);
            console.log("평균 대기 시간 :", tmp/queue_run.length);
        })
    });
}

function SCAN() {
    r.question("헤드가 움직인 순서를 입력해 주세요 (2개) : ", Head_moved => {
        Head_moved = Head_moved.split(' ');
        let last_head = Head_moved[Head_moved.length-1];
        let second_head = Head_moved[Head_moved.length-2];

        let move_dir = (last_head > second_head) ? true : false;
        let queue = [];
        let queue_avg = [];
        let queue_run = [];
        r.question("디스크 트랙 범위를 입력해 주세요 (최소, 최대) : ", Track_range => {
            let min = Track_range.split(' ')[0];
            let max = Track_range.split(' ')[1];

            console.log("작업 목록을 입력해 주세요");
            r.question("", data => {
                queue = data.split(' ');
                queue.sort((a, b) => a-b);
               
    
                queue.forEach(val => {if(isNaN(val)) return console.log("입력값 중 숫자가 아닌것이 있습니다.")});
    
                let first_head = Closer(last_head, queue, max);

                for (let i = 0; i < 2; i++) {

                    if (move_dir) { // 증가, 오른쪽
                    
                        let tmp = queue.slice(queue.indexOf(first_head) + (first_head > last_head) ? 2 : 0);
                        tmp.push(max); // 트랙 끝 추가
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    } else { // 감소, 왼쪽
                        
                        let tmp = queue.slice(0, queue.indexOf(first_head) + ((first_head < last_head) ? 1 : 0));
                        tmp.unshift(min); // 트랙 앞 추가
                        tmp.sort((a,b) => b-a);
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    }

                }

                let tmp = 0;
                let header = last_head;
                queue_run.forEach((value, index) => {
                    if (index == queue_run.length);
                    
        
                    queue_avg.push(Math.abs(Diff(header, value)));
                    tmp += Math.abs(Diff(header, value));
                    header = value;
                });

                console.log("실행 순서 : ", queue_run);
                console.log("평균 대기 시간 : ", tmp/queue_run.length);

            })
        })
    }) // 11 39 86 9 57
}

function C_SCAN() {
    r.question("헤드가 움직인 순서를 입력해 주세요 (2개) : ", Head_moved => {
        Head_moved = Head_moved.split(' ');
        let last_head = Head_moved[Head_moved.length-1];
        let second_head = Head_moved[Head_moved.length-2];

        let move_dir = (last_head > second_head) ? true : false;
        let queue = [];
        let queue_avg = [];
        let queue_run = [];
        r.question("디스크 트랙 범위를 입력해 주세요 (최소, 최대) : ", Track_range => {
            let min = Track_range.split(' ')[0];
            let max = Track_range.split(' ')[1];

            console.log("작업 목록을 입력해 주세요");
            r.question("", data => {
                queue = data.split(' ');
                queue.sort((a, b) => a-b);
               
    
                queue.forEach(val => {if(isNaN(val)) return console.log("입력값 중 숫자가 아닌것이 있습니다.")});
    
                let first_head = Closer(last_head, queue, max);

                for (let i = 0; i < 2; i++) {

                    if (move_dir) { // 증가, 오른쪽
                    
                        let tmp = queue.slice(queue.indexOf(first_head) + (first_head > last_head) ? 2 : 0);
                        // tmp.push(max); // 트랙 끝 추가
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    } else { // 감소, 왼쪽
                        
                        let tmp = queue.slice(0, queue.indexOf(first_head) + ((first_head < last_head) ? 1 : 0));
                        // tmp.unshift(min); // 트랙 앞 추가
                        tmp.sort((a,b) => b-a);
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    }

                }

                let tmp = 0;
                let header = last_head;
                queue_run.forEach((value, index) => {
                    if (index == queue_run.length);
                    
        
                    queue_avg.push(Math.abs(Diff(header, value)));
                    tmp += Math.abs(Diff(header, value));
                    header = value;
                });

                console.log("실행 순서 : ", queue_run);
                console.log("평균 대기 시간 : ", tmp/queue_run.length);

            })
        })
    }) // 11 39 86 9 57
}

function LOOK() {
    r.question("헤드가 움직인 순서를 입력해 주세요 (2개) : ", Head_moved => {
        Head_moved = Head_moved.split(' ');
        let last_head = Head_moved[Head_moved.length-1];
        let second_head = Head_moved[Head_moved.length-2];

        let move_dir = (last_head > second_head) ? true : false;
        let queue = [];
        let queue_avg = [];
        let queue_run = [];
        r.question("디스크 트랙 범위를 입력해 주세요 (최소, 최대) : ", Track_range => {
            let min = Track_range.split(' ')[0];
            let max = Track_range.split(' ')[1];

            console.log("작업 목록을 입력해 주세요");
            r.question("", data => {
                queue = data.split(' ');
                queue.sort((a, b) => a-b);
               
    
                queue.forEach(val => {if(isNaN(val)) return console.log("입력값 중 숫자가 아닌것이 있습니다.")});
    
                let first_head = Closer(last_head, queue, max);

                for (let i = 0; i < 2; i++) {

                    if (move_dir) { // 증가, 오른쪽
                    
                        let tmp = queue.slice(queue.indexOf(first_head) + (first_head > last_head) ? 2 : 0);
                        tmp.push(max); // 트랙 끝 추가
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    } else { // 감소, 왼쪽
                        
                        let tmp = queue.slice(0, queue.indexOf(first_head) + ((first_head < last_head) ? 1 : 0));
                        tmp.unshift(min); // 트랙 앞 추가
                        // tmp.sort((a,b) => b-a);
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    }

                }

                let tmp = 0;
                let header = last_head;
                queue_run.forEach((value, index) => {
                    if (index == queue_run.length);
                    
        
                    queue_avg.push(Math.abs(Diff(header, value)));
                    tmp += Math.abs(Diff(header, value));
                    header = value;
                });

                console.log("실행 순서 : ", queue_run);
                console.log("평균 대기 시간 : ", tmp/queue_run.length);

            })
        })
    }) // 11 39 86 9 57
}

function C_LOOK() {
    r.question("헤드가 움직인 순서를 입력해 주세요 (2개) : ", Head_moved => {
        Head_moved = Head_moved.split(' ');
        let last_head = Head_moved[Head_moved.length-1];
        let second_head = Head_moved[Head_moved.length-2];

        let move_dir = (last_head > second_head) ? true : false;
        let queue = [];
        let queue_avg = [];
        let queue_run = [];
        r.question("디스크 트랙 범위를 입력해 주세요 (최소, 최대) : ", Track_range => {
            let min = Track_range.split(' ')[0];
            let max = Track_range.split(' ')[1];

            console.log("작업 목록을 입력해 주세요");
            r.question("", data => {
                queue = data.split(' ');
                queue.sort((a, b) => a-b);
               
    
                queue.forEach(val => {if(isNaN(val)) return console.log("입력값 중 숫자가 아닌것이 있습니다.")});
    
                let first_head = Closer(last_head, queue, max);

                for (let i = 0; i < 2; i++) {

                    if (move_dir) { // 증가, 오른쪽
                    
                        let tmp = queue.slice(queue.indexOf(first_head) + (first_head > last_head) ? 2 : 0);
                        // tmp.push(max); // 트랙 끝 추가
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    } else { // 감소, 왼쪽
                        
                        let tmp = queue.slice(0, queue.indexOf(first_head) + ((first_head < last_head) ? 1 : 0));
                        // tmp.unshift(min); // 트랙 앞 추가
                        // tmp.sort((a,b) => b-a);
                        queue_run = queue_run.concat(tmp);
                        move_dir = !move_dir;
    
                    }

                }

                let tmp = 0;
                let header = last_head;
                queue_run.forEach((value, index) => {
                    if (index == queue_run.length);
                    
        
                    queue_avg.push(Math.abs(Diff(header, value)));
                    tmp += Math.abs(Diff(header, value));
                    header = value;
                });

                console.log("실행 순서 : ", queue_run);
                console.log("평균 대기 시간 : ", tmp/queue_run.length);

            })
        })
    }) // 11 39 86 9 57
}



function Closer(target, data, min) {
    let near = 0;
    let abs = 0;
    for(var i = 0; i < data.length; i++) {
        abs = ( (data[i] - target) < 0) ?
                -(data[i] - target) : (data[i] - target);
        if(abs < min) {
            min = abs;
            near = data[i];
        }
    }
    // console.log(near);
    return near;
}
function Diff(a, b) {
    return (a > b) ? a - b : b - a;
}