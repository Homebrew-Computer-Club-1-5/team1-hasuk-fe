interface INumber {
  num: number;
}
function Exam({ num }: INumber) {
  var sum = 0;
  for (let first = 0; first <= num; first++) {
    sum += first;
  }
  console.log(sum);

  return <div></div>;
}

export default Exam;
