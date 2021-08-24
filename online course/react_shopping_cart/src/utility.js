export default function Currency(num){
    if(!num){
        return '$'+0;
    }
    return "$"+Number(num.toFixed(1)).toLocaleString()+" "; //fixed-point notation
}
