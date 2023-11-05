let Base64 = {
  _Rixits: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_",
  fromNumber: function(number) {
    if (
      isNaN(Number(number)) ||
      number === null ||
      number === Number.POSITIVE_INFINITY
    )
      throw "The input is not valid";
    if (number < 0) throw "Can't represent negative numbers now";

    var rixit; // like 'digit', only in some non-decimal radix
    var residual = Math.floor(number);
    var result = "";
    while (true) {
      rixit = residual % 64;
      result = this._Rixits.charAt(rixit) + result;
      residual = Math.floor(residual / 64);
      if (residual === 0) break;
    }
    return result;
  },

  toNumber: function(rixits) {
    var result = 0;
    rixits = rixits.split("");
    for (var e = 0; e < rixits.length; e++) {
      result = result * 64 + this._Rixits.indexOf(rixits[e]);
    }
    return result;
  }
};

const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const hashstr = str => {
  let v1 = Base64.fromNumber(cyrb53(str, 0));
  let v2 = Base64.fromNumber(cyrb53(str, 1));
  let v3 = Base64.fromNumber(cyrb53(str, 2));
  return v1 + v2 + v3;
};

export default cyrb53;
