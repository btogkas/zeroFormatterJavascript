 var T1B = new function () {
        this.name = "T1B";
        this.fields = [];
        this.fields.push(
            { name: "test", type: ZF.Type.String }
        );
    };
    var dt = [19, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 3, 0, 0, 0, 97, 94, 36];
    
    var T2B = new function () {
        this.name = "T2B";
        this.fields = [];
        this.fields.push(
            { name: "test", type: ZF.Type.Bool },
            { name: "test2", type: ZF.Type.Bool }
        );
    };
    var dt2 = [18, 0, 0, 0, 1, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 1, 1];
    
    var T_L_T1B = new function () {
        this.name = "T_L_T1B";
        this.fields = [];
        this.fields.push(
            { name: "Prop1", type: { main: ZF.Type.Array, sub: ZF.Type.Bool } },
            { name: "Prop2", type: ZF.Type.Int16 }
        );
    };
    var dt3 = [1, 0, 0, 0, 25, 0, 0, 0, 1, 0, 0, 0, 16, 0, 0, 0, 23, 0, 0, 0, 3, 0, 0, 0, 1, 0, 1, 15, 0];
    
    var T_TS = new function () {
        this.name = "T_TS";
        this.fields = [];
        this.fields.push(
            { name: "Decimal", type: ZF.Type.Decimal }
        );
    };
    var dt4 = [28, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 78, 108, 87, 91, 205, 3, 1, 0];


    var T_B_LST_C = new function () {
        this.name = "T_B_LST_C";
        this.fields = [];
        this.fields.push(
            { name: "Value", type: { main: ZF.Type.Array, sub: "T_TS" } }
        );
    };
    var dt5 = [72,0,0,0,0,0,0,0,12,0,0,0,2,0,0,0,28,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,200,0,0,0,0,0,0,0];
    
    var T_B_LST_LST_C = new function () {
        this.name = "T_B_LST_C";
        this.fields = [];
        this.fields.push(
            { name: "Value", type: { main: ZF.Type.Array, sub: { main: ZF.Type.Array, sub:"T_TS"} } }
        );
    };
    var dt6 = [80, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0];

    var T_SDD = new function () {
        this.name = "T_SDD";
        this.fields = [];
        this.fields.push(
            { name: "Prop1", type: ZF.Type.String },
            { name: "Prop2", type: ZF.Type.Decimal },
            { name: "Prop3", type: ZF.Type.Decimal }
        );
    };

    var _T_SubscriptionItem = new function () {
        this.name = "_T_SubscriptionItem";
        this.fields = [];
        this.fields.push(
            { name: "Action", type: ZF.Type.String },
            { name: "Name", type: ZF.Type.String },
            { name: "UserId", type: ZF.Type.Guid, isNullable: true },
            { name: "TokenId", type: ZF.Type.String },
            { name: "CoinPairId", type: ZF.Type.Int16, isNullable: true },
            { name: "Group", type: ZF.Type.String },
            { name: "Resolution", type: ZF.Type.Int32, isNullable: true },
            { name: "AllPairSubscribers", type: ZF.Type.Bool, isNullable: true },
            { name: "Data", type: ZF.Type.String }
        );
    };

    var dt7 = [194, 0, 0, 0, 8, 0, 0, 0, 44, 0, 0, 0, 54, 0, 0, 0, 74, 0, 0, 0, 91, 0, 0, 0, 95, 0, 0, 0, 98, 0, 0, 0, 103, 0, 0, 0, 108, 0, 0, 0, 110, 0, 0, 0, 6, 0, 0, 0, 85, 112, 100, 97, 116, 101, 16, 0, 0, 0, 67, 104, 97, 114, 116, 68, 97, 116, 97, 67, 104, 97, 110, 103, 101, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 1, 22, 0, 1, 0, 0, 0, 49, 1, 1, 0, 0, 0, 0, 0, 80, 0, 0, 0, 123, 34, 116, 34, 58, 49, 53, 54, 53, 48, 49, 54, 48, 48, 48, 48, 48, 48, 44, 34, 111, 34, 58, 48, 46, 48, 48, 48, 48, 48, 48, 48, 48, 44, 34, 104, 34, 58, 48, 46, 48, 48, 48, 48, 48, 48, 48, 48, 44, 34, 108, 34, 58, 48, 46, 48, 48, 48, 48, 48, 48, 48, 48, 44, 34, 99, 34, 58, 48, 46, 48, 44, 34, 118, 34, 58, 48, 46, 48, 125];

    //We need to add the templates if we want to have them as an 
    //object in another template
    ZF.Templates.push(T1B);
    ZF.Templates.push(T2B);
    ZF.Templates.push(T_L_T1B);
    ZF.Templates.push(T_TS);
    ZF.Templates.push(T_B_LST_C);
    ZF.Templates.push(T_SDD);
    ZF.Templates.push(_T_SubscriptionItem);


    var obj = ZF.Parse(dt, T1B);
    var obj2 = ZF.Parse(dt2, T2B);
    var obj3 = ZF.Parse(dt3, T_L_T1B);
    var obj4 = ZF.Parse(dt4, T_TS);
    var obj5 = ZF.Parse(dt5, T_B_LST_C);
    var obj6 = ZF.Parse(dt6, T_B_LST_LST_C);
    var obj7 = ZF.Parse(dt7, _T_SubscriptionItem);