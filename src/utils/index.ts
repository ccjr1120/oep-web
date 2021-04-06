export function randomString() {  
    let e =  6;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    str = "";
    for (let i = 0; i < e; i++) str += t.charAt(Math.floor(Math.random() * a));
    return str
}
