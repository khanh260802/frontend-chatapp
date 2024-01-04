function formatTimeAgo(timestamp) {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);
    const timeDifferenceInSeconds = Math.floor((currentDate - inputDate) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} giây trước`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} giờ trước`;
    } else {
      const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      const dayOfWeek = daysOfWeek[inputDate.getDay()];
      const formattedDate = `${dayOfWeek}, ${inputDate.toLocaleDateString('vi-VN')}`;
      return formattedDate;
    }
  }
export default formatTimeAgo; 
  