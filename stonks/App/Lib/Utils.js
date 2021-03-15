/* File containing useful utility functions for the App */


// simple function to convert "year" -> "years" when necessary
function pluralize(count, string) {
  return count > 1 ? string + "s" : string
}

/* 
    Function that states the time elapsed since the date object
    e.g. 1 minute ago, 1 hour ago, etc.
*/
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + ` ${pluralize(Math.floor(interval), "year")} ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ` ${pluralize(Math.floor(interval), "month")} ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ` ${pluralize(Math.floor(interval), "day")} ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ` ${pluralize(Math.floor(interval), "hour")} ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ` ${pluralize(Math.floor(interval), "minute")} ago`;
    }
    return Math.floor(seconds) + ` ${pluralize(Math.floor(interval), "second")} ago`;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatMoney(number) {
    let decPlaces = 2;
    let decSep=".";
    let thouSep=",";
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    let sign = number < 0 ? "-" : "";
    let i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    let j = (j = i.length) > 3 ? j % 3 : 0;

    return sign + "$" + numberWithCommas(number);
    // return sign + "$" + (j ? i.substr(0, j) + thouSep : "") +
    //     i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    //     (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

export { timeSince, formatMoney};
