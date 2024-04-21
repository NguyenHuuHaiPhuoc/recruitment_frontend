export class  Company{

    email : string;
    password : string;
    confirmPass : string;
    nameCompany : string;
    taxCode : string;
    typeBusiness : string;
    website : string;
    address : string;
    date : Date;
    logo : string;
    phone : string;
    skill : any[];
    summary : string;


  constructor
  (
    email:string,
    password:string,
    confirmPass:string,
    nameCompany:string,
    taxCode:string,
    typeBusiness:string, 
    website:string,
    address:string,
    date:Date,
    logo:string,
    phone:string,
    skill:any[],
    summary:string
  )

  {
    this.email = email;
    this.password = password;
    this.confirmPass = confirmPass;
    this.nameCompany=nameCompany;
    this.taxCode = taxCode;
    this.typeBusiness = typeBusiness;
    this.website=website;
    this.address = address;
    this.date = date;
    this.logo = logo;
    this.phone = phone;
    this.skill = skill;
    this.summary=summary;

  }
}