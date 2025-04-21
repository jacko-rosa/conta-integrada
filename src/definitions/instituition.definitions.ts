export class Instituition {
    compeCode: string;
    companyCnpj: string;
    brandName: string;
    ispb: string;
  
    constructor(compeCode: string, companyCnpj: string, brandName: string, ispb: string) {
      this.compeCode = compeCode;
      this.companyCnpj = companyCnpj;
      this.brandName = brandName;
      this.ispb = ispb;
    }
  
    static BANCO_DO_BRASIL = new Instituition('001', '00000000000191', 'Banco do Brasil S.A.', '00000000');
    static BANCO_BRADESCO = new Instituition('237', '60746948000112', 'Banco Bradesco S.A.', '60746948');
    static ITAU_UNIBANCO = new Instituition('341', '60701190000104', 'Itaú Unibanco S.A.', '60701190');
    static CAIXA_ECONOMICA_FEDERAL = new Instituition('104', '00360305000104', 'Caixa Econômica Federal', '00360305');
    static BANCO_SANTANDER = new Instituition('033', '90400888000142', 'Banco Santander (Brasil) S.A.', '90400888');
    static BANCO_CITIBANK = new Instituition('745', '33000000000100', 'Banco Citibank S.A.', '33000000');
    static BANCO_INTER = new Instituition('077', '62837074000174', 'Banco Inter S.A.', '62837074');
    static NUBANK = new Instituition('260', '18236120000158', 'Nubank', '18236120');
    static PAGSEGURO = new Instituition('290', '18727053000174', 'PagSeguro Internet S.A.', '18727053');
    static BANCO_B3 = new Instituition('096', '13140088000199', 'Banco B3 S.A.', '13140088');
  
    static ALL_INSTITUTIONS: Instituition[] = [
      Instituition.BANCO_DO_BRASIL,
      Instituition.BANCO_BRADESCO,
      Instituition.ITAU_UNIBANCO,
      Instituition.CAIXA_ECONOMICA_FEDERAL,
      Instituition.BANCO_SANTANDER,
      Instituition.BANCO_CITIBANK,
      Instituition.BANCO_INTER,
      Instituition.NUBANK,
      Instituition.PAGSEGURO,
      Instituition.BANCO_B3,
    ];
  
    static findByCompeCode(compeCode: string): Instituition | undefined {
      return Instituition.ALL_INSTITUTIONS.find(institution => institution.compeCode === compeCode);
    }
  
    static findByIspb(ispb: string): Instituition | undefined {
      return Instituition.ALL_INSTITUTIONS.find(institution => institution.ispb === ispb);
    }
  }