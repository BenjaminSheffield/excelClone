import ColumnEnum from "../enums/ColumnEnum"

var GenerateColumnName = function(columnNumber: number){

    var b = [columnNumber], sp, out, i, div;
      sp = 0;
      while(sp < b.length) {
          if (b[sp] > 25) {
              div = Math.floor(b[sp] / 26);
              b[sp + 1] = div - 1;
              b[sp] %= 26;
          }
          sp += 1;
      }
  
      out = "";
      for (i = 0; i < b.length; i += 1) {
          out = ColumnEnum[b[i]] + out;
      }
  
      return out;
    };
export default GenerateColumnName