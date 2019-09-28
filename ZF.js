var ZFLib = function () {

    var rgbToHex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    var getInt16FromBytes = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        //somehow the (a[i]) | (a[i + 1] << 8) did not work, there might be a better way
        if (a[i + 1] > 127) {
            return -32768 + (a[i] + (a[i + 1] - 128) * 256);
        }
        else {
            return a[i] + a[i + 1] * 256;
        }
    }
    var getInt32FromBytes = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return ((a[i]) | (a[i + 1] << 8) | (a[i + 2] << 16) | (a[i + 3] << 24));
    }
    var getInt64FromBytes = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        //min value:-9223372036854775808
        if (a[i + 7] > 127) {
            return -9223372036854775808 +
                a[i] +
                ((a[i + 1]) * 256) +
                ((a[i + 2]) * 65536) +
                ((a[i + 3]) * 16777216) +
                ((a[i + 4]) * 4294967296) +
                ((a[i + 5]) * 1099511627776) +
                ((a[i + 6]) * 281474976710656) +
                ((a[i + 7] - 128) * 72057594037927936);

        } else {
            return a[i] +
                ((a[i + 1]) * 256) +
                ((a[i + 2]) * 65536) +
                ((a[i + 3]) * 16777216) +
                ((a[i + 4]) * 4294967296) +
                ((a[i + 5]) * 1099511627776) +
                ((a[i + 6]) * 281474976710656) +
                ((a[i + 7]) * 72057594037927936);
        }

    }
    var getUInt16FromBytes = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return a[i] + 256 * a[i + 1];
    }
    var getUInt32FromBytes = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return a[i] + 256 * a[i + 1] + 65536 * a[i + 2] + 16777216 * a[i + 3];
    }
    var getUInt64FromBytes = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return a[i] + 256 * a[i + 1] + 65536 * a[i + 2] + 16777216 * a[i + 3] + 4294967296 * a[i + 4] + 1099511627776 * a[i + 5] + 281474976710656 * a[i + 6] + 72057594037927936 * a[i + 7];
    }
    var getSingle = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        var buffer = new ArrayBuffer(4);
        var dataview = new DataView(buffer);
        dataview.setUint32(0, getUInt32FromBytes(a, i));
        return dataview.getFloat32(0);
    }
    var getDouble = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        var buffer = new ArrayBuffer(8);
        var dataview = new DataView(buffer);
        dataview.setUint64(0, getUInt64FromBytes(a, i));
        return dataview.getFloat64(0);
    }
    var getBool = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return a[i] == 1;
    }
    var getByte = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return a[i];
    }
    var getSByte = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        if (a[i] > 127) {
            return 255 - a[i];
        } else {
            return a[i];
        }
    }
    var getChar = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return String.fromCharCode(getUInt16FromBytes(a, i));
    }
    var getDecimal = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        var reverse = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var s = 0; s < 8; s++) {
            reverse[s] = a[i + 8 + s];
        }
        for (var s = 0; s < 4; s++) {
            reverse[s + 8] = a[i + 4 + s];
        }
        for (var s = 0; s < 4; s++) {
            reverse[s + 12] = a[i + s];
        }

        var value = 0;
        for (var i = 0; i < 12; i++) {
            value += reverse[i] * Math.pow(255, i);
        }

        var d = 0.0;
        for (var s = 11; s >= 0; --s) {
            var k = reverse[s];
            for (var j = 0; j != 8; ++j) {
                d *= 2;
                d += (k & 0x80) >> 7;
                k <<= 1;
            }
        }
        var scale = reverse[14];
        d /= Math.pow(10, scale);
        if (reverse[15] >= 0x80) d = -d;
        return d;
    }
    var getGuid = function (a, i) {
        var str = "";
        for (var j = 0; j < 4; j++) {
            str += rgbToHex(a[i + j]);
        }
        str += "-";
        for (var j = 4; j < 6; j++) {
            str += rgbToHex(a[i + j]);
        }
        str += "-";
        for (var j = 6; j < 8; j++) {
            str += rgbToHex(a[i + j]);
        }
        str += "-";
        for (var j = 8; j < 10; j++) {
            str += rgbToHex(a[i + j]);
        }
        str += "-";
        for (var j = 10; j < 16; j++) {
            str += rgbToHex(a[i + j]);
        }
        return str;
    }
    var getTimeSpan = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        var seconds = getUInt64FromBytes(a, i);
        var milliseconds = getUInt32FromBytes(a, i + 8) / 1000000;
        return (seconds * 1000) + milliseconds;
    }
    var getDateTime = function (a, isNullable, i) {
        if (isNullable) { if (a[i] == 0) { return null; } else { i++;}}
        return new Date(getTimeSpan(a, i));
    }
    var getString = function (a, i) {

        var arrayLength = getUInt32FromBytes(a,false, i);
        if (arrayLength == 4294967295) {
            arrayLength = 0;
        }
        var length = 4;
        var str = "";

        for (var j = 0; j < arrayLength; j++) {
            str += String.fromCharCode(a[i + length + j]);
        }

        return {
            object: str, length: length + arrayLength
        };

    }

    var GetParamLength = function (type, isNullable) {
        var extra = 0;
        if (isNullable) {
            extra++;
        }
        switch (type) {
            case ZF.Type.Int16:
                return 2 + extra;
            case ZF.Type.Int32:
                return 4 + extra;
            case ZF.Type.Int64:
                return 8 + extra;
            case ZF.Type.UInt16:
                return 2 + extra;
            case ZF.Type.UInt32:
                return 4 + extra;
            case ZF.Type.UInt64:
                return 8 + extra;
            case ZF.Type.Single:
                return 4 + extra;
            case ZF.Type.Double:
                return 8 + extra;
            case ZF.Type.Bool:
                return 1 + extra;
            case ZF.Type.Byte:
                return 1 + extra;
            case ZF.Type.SByte:
                return 1 + extra;
            case ZF.Type.Char:
                return 2 + extra;
            case ZF.Type.Decimal:
                return 16 + extra;
            case ZF.Type.Guid:
                return 16;
            case ZF.Type.TimeSpan:
                return 12 + extra;
            case ZF.Type.DateTime:
                return 12 + extra;
        }
    };
    var GetValue = function (a, type,isNullable, indexStart) {

        var result = {};

        if (type.sub.length == 0) {
            switch (type) {
                case ZF.Type.Int16:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getInt16FromBytes(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Int32:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getInt32FromBytes(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Int64:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getInt64FromBytes(a, isNullable, indexStart);
                    return result;
                case ZF.Type.UInt16:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getUInt16FromBytes(a, isNullable, indexStart);
                    return result;
                case ZF.Type.UInt32:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getUInt32FromBytes(a, isNullable, indexStart);
                    return result;
                case ZF.Type.UInt64:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getUInt64FromBytes(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Single:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getSingle(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Double:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getDouble(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Bool:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getBool(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Byte:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getByte(a, isNullable, indexStart);
                    return result;
                case ZF.Type.SByte:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getSByte(a, indexStart);
                    return result;
                case ZF.Type.Char:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getChar(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Decimal:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getDecimal(a, isNullable, indexStart);
                    return result;
                case ZF.Type.Guid:
                    result.length = GetParamLength(type,false);
                    result.object = getGuid(a, indexStart);
                    return result;
                case ZF.Type.TimeSpan:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getTimeSpan(a, isNullable, indexStart);
                    return result;
                case ZF.Type.DateTime:
                    result.length = GetParamLength(type, isNullable);
                    result.object = getDateTime(a, isNullable, indexStart);
                    return result;
                case ZF.Type.String:
                    return getString(a, indexStart);
                default:
                    //a template has been assigned as a type
                    var templ = ZF.GetTemplate(type);
                    if (templ == null) {
                        throw "Template " + type + " not found";
                    }
                    return GetObject(a, templ, indexStart);
                    break;
            }
        }
        else {
            var templ = ZF.GetTemplate(type.sub);
            if (templ != null) {
                return GetTemplateArray(a, templ, indexStart);
            }
            var arrayLength = getUInt32FromBytes(a, indexStart);
            indexStart += 4;

            var res = { object: [], length: indexStart };
            for (var i = 0; i < arrayLength; i++) {
                var result = GetValue(a, type.sub, res.length);
                res.object.push(result.object);
                res.length += result.length;
            }
            return res;

        }
    };
    var GetObject = function (a, objTemplate, objIndexStart) {

        var currentIndex = objIndexStart;
        //get the first 4 bytes that is the length
        //var msgLength = getUInt32FromBytes(a, currentIndex);
        currentIndex += 4;

        var fields = objTemplate.fields;
        var obj = {};

        var noOfFields = getUInt32FromBytes(a, false, currentIndex) + 1;
        currentIndex += 4;

        if (noOfFields != fields.length) {
            throw "no of fields do not much the message.";
        }

        var fieldStartPositions = [];
        for (var i = 0; i < noOfFields; i++) {
            fieldStartPositions.push(getUInt32FromBytes(a,false, currentIndex));
            currentIndex += 4;
        }

        //Then read the fields of the template and start assigning the field values...
        for (var i = 0; i < fieldStartPositions.length; i++) {
            //var fieldLength = fieldStartPositions[i + 1] - fieldStartPositions[i];
            //now based on the field type we can assign the field..
            var isNullable = fields[i].isNullable;
            if (isNullable === true) {
                isNullable = true;
            } else {
                isNullable = false;
            }

            var value = GetValue(a, fields[i].type, isNullable, objIndexStart + fieldStartPositions[i]);
            currentIndex += value.length;
            obj[fields[i].name] = value.object;
        }
        //then the last field till the end 
        return { object: obj, length: currentIndex - objIndexStart };
    };
    var GetTemplateArray = function (a, objTemplate, objIndexStart) {

        var initialStart = objIndexStart;
        var noOfItems = getUInt32FromBytes(a,false, objIndexStart);
        objIndexStart += 4;
        var arr = [];
        //for the number of objects
        for (var i = 0; i < noOfItems; i++) {
            //get the size of the object in order to insert it to the next object
            var objLength = getUInt32FromBytes(a,false, objIndexStart);
            arr.push(GetObject(a, objTemplate, objIndexStart).object);
            objIndexStart += objLength;
        }

        return { object: arr, length: objIndexStart - initialStart };
    };
    this.Parse = function (a, objTemplate) {

        //get the first 4 bytes that is the length
        var msgLength = getUInt32FromBytes(a,false, 0);
        if (a.length == msgLength) //Single object    
        {
            return GetObject(a, objTemplate, 0).object;
        }
        else {
            return GetTemplateArray(a, objTemplate, 0).object;
        }
    };
};
var ZF = {
    lib: new ZFLib(),
    Parse: function (a, objTemplate) {
        return this.lib.Parse(a, objTemplate);
    }
};
ZF.Type = {
    Int16: "16",
    Int32: "32",
    Int64: "64",
    UInt16: "U16",
    UInt32: "U32",
    UInt64: "U64",
    Single: "S",
    Double: "D",
    Bool: "B",
    Byte: "8",
    SByte: "SB",
    Char: "C",
    Decimal: "De",
    Guid: "G",
    TimeSpan: "T",
    DateTime: "DT",
    String: "ST",
    Array: "A",
};
ZF.Templates = [];
ZF.GetTemplate = function (type) {
    var objTemplate = null;
    //check if there is a registered template for this type..
    //if not then throw exception....
    for (var i = 0; i < ZF.Templates.length; i++) {
        var subTemplate = ZF.Templates[i];
        if (subTemplate.name == type) {
            objTemplate = subTemplate;
            break;
        }
    }
    return objTemplate;
};