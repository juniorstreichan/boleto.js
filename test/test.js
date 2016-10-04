var expect = require('chai').expect;

var Boleto = require('../src/boleto');

var validBankslipNumber = '34195000080123320318964221470004584410000002000';
var invalidBankslipNumber = '34195000080123320318964221470004584410000002001';

var bankslip = new Boleto(validBankslipNumber);

describe('Boleto.js', function() {
  describe('#constructor()', function() {
    it('should return a valid Boleto object when a valid bankslip code is passed', function() {
      var bankslip = new Boleto(validBankslipNumber);

      expect(bankslip.bankSlipNumber).to.equal('34195000080123320318964221470004584410000002000');
    });

    it('should throw an error when an invalid bankslip code is passed', function() {
      var fn = function() { new Boleto(invalidBankslipNumber) };

      expect(fn).to.throw(Error);
      expect(fn).to.throw(/Invalid bank slip number/);
    });
  });

  describe('#valid()', function() {
    it('should return true if a valid bankslip number is passed', function() {
      expect(bankslip.valid()).to.equal(true);
    });

    it('should return false if an invalid bankslip number is passed', function() {
      var invalidBankslip = Object.create(bankslip);
      invalidBankslip.bankSlipNumber = '123';

      expect(invalidBankslip.valid()).to.equal(false);
    });
  });

  describe('#barcode()', function() {
    it('should return correct barcode', function() {
      expect(bankslip.barcode()).to.equal('34195844100000020005000001233203186422147000');
    });
  });

  describe('#number()', function() {
    it('should return correct bankslip number', function() {
      expect(bankslip.number()).to.equal('34195000080123320318964221470004584410000002000');
    });
  });

  describe('#prettyNumber()', function() {
    it('should return correct, formatted bankslip number', function() {
      expect(bankslip.prettyNumber()).to.equal('34195.00008 01233.203189 64221.470004 5 84410000002000');
    });
  });

  describe('#bank()', function() {
    it('should return correct bank name', function() {
      expect(bankslip.bank()).to.equal('Itaú');
    });
  });

  describe('#currency()', function() {
    it('should return correct currency', function() {
      expect(bankslip.currency()).to.deep.equal({ code: 'BRL', symbol: 'R$', decimal: ',' });
    });
  });

  describe('#checksum()', function() {
    it('should return correct checksum', function() {
      expect(bankslip.checksum()).to.equal('5');
    });
  });

  describe('#expirationDate()', function() {
    it('should return correct expiration date', function() {
      expect(bankslip.expirationDate()).to.deep.equal(new Date('2020-11-16'));
    });
  });

  describe('#amount()', function() {
    it('should return correct amount', function() {
      expect(bankslip.amount()).to.equal('20.00');
    });
  });

  describe('#prettyAmount()', function() {
    it('should return correct, formatted amount', function() {
      expect(bankslip.prettyAmount()).to.equal('R$ 20,00');
    });
  });
});
