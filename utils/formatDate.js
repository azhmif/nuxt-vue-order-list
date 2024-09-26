const formatDate = (date) => {
  let conversDate = date.split("-").reverse().join("-");
  let newdate = new Date(conversDate);
  const month = newdate.toLocaleString("default", { month: "long" });
  const days = newdate.getDate();
  const years = newdate.getFullYear();
  return days + " " + month + " " + years;
};
export default formatDate;
