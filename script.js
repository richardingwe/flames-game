const first_name = document.querySelector('#first_name');
const second_name = document.querySelector('#second_name');
const form = document.querySelector('form');
const result = document.querySelector('#result');

form.onsubmit = (e) => {
    e.preventDefault();
    // flames(first_name.value, second_name.value);
    let flames = new Flames(first_name.value, second_name.value).compute();
    // console.log(flames);
    $('#exampleModal').modal('show');
    result.innerHTML = flames.concat('!!!');
    db.collection('flames').add({
        first_name: first_name.value.toLowerCase(),
        second_name: second_name.value.toLowerCase(),
        result: flames,
        time: (new Date(Date.now())).toString()
    });
};

// function flames(name1, name2) {
//     let arr1_1 = name1.toLowerCase().split('');
//     let arr1_2 = name1.toLowerCase().split('');
//     let arr2_1 = name2.toLowerCase().split('');
//     let arr2_2 = name2.toLowerCase().split('');
//     //["r", "i", "c", "h", "a", "r", "d"]
//     //["a", "m", "a", "k", "a"]
//     let arr_1 = [];
//     let arr_2 = [];

//     for (let i = 0; i < 20; i++) {
//         arr1_1 = arr1_1.filter((letterr) => letterr !== arr2_1[i]);
//     }

//     for (let i = 0; i < 20; i++) {
//         arr2_2 = arr2_2.filter((letterr) => letterr !== arr1_2[i]);
//     }

//     console.log(arr1_1);
//     console.log(arr2_2);

//     console.log('arr_1', arr_1);
// }

class Flames {
    constructor(x, y) {
        this.worker(x, y);
    }
    worker(x, y) {
        let x_array = x.toLowerCase().replace(/\s+/g).split("");
        let y_array = y.toLowerCase().replace(/\s+/g).split("");
        let counter = 0;
        loop1:
        for (let i = 0; i < x_array.length; i++) {
            loop2:
            for (let j = 0; j < y_array.length; j++) {
                counter++;
                if (x_array[i] == y_array[j]) {
                    x_array.splice(i, 1);
                    y_array.splice(j, 1);
                    this.worker(x_array.join(""), y_array.join(""));
                    break loop1;
                }
            }
        }
        if (counter == (x_array.length * y_array.length)) {
            this.computed = (x_array.length + y_array.length);
        }
    }
    compute() {
        let flames_tree = {
            1: "Friends",
            2: "Lovers",
            3: "Admirers",
            4: "Married",
            5: "Enemies",
            6: "Secret Lovers"
        };
        let flames_determinant = function (x) {
            while (x > 0) {
                x -= 6;
            }
            return x;
        };
        let result = flames_determinant(this.computed);
        if (result <= 0) {
            result = result + 6;
        }
        return flames_tree[result];
    }
}

//Returns the status of both members as Friends, Lovers, e.t.c;