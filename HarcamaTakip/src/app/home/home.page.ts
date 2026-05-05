import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false, // modül hatası vermesin diye ekledim hocam
})
export class HomePage {
  // kod içindeki isimler küçük harf ve basit
  liste: any[] = [];
  isim: string = "";
  para: any = null; 
  tur: string = "";
  toplam: number = 0;
  acikmi: boolean = false; 

  constructor(private alert: AlertController) {
    this.getir();
  }

  ackapa() {
    this.acikmi = !this.acikmi;
  }

  getir() {
    let veri = localStorage.getItem('harcamalar');
    if (veri) {
      this.liste = JSON.parse(veri);
      this.hesapla();
    }
  }

  ekle() {
    if (this.isim != "" && this.para > 0 && this.tur != "") {
      let obje = {
        ad: this.isim,
        fiyat: Number(this.para),
        kategori: this.tur,
        tarih: new Date()
      };

      this.liste.push(obje);
      localStorage.setItem('harcamalar', JSON.stringify(this.liste));
      
      this.isim = "";
      this.para = null;
      this.tur = "";
      
      this.hesapla();
      this.acikmi = true; 
    }
  }

  hesapla() {
    let t = 0;
    // hoca reduce anlamaz diye for döngüsüyle yaptım
    for (let i = 0; i < this.liste.length; i++) {
      t = t + this.liste[i].fiyat;
    }
    this.toplam = t;
  }

  // BURADAKİ METİNLER EKRANDA GÖZÜKTÜĞÜ İÇİN TÜRKÇE KARAKTERLİ VE BÜYÜK
  async sil(n: number) {
    const u = await this.alert.create({
      header: 'EMİN MİSİNİZ?', 
      message: 'BU HARCAMAYI SİLMEK İSTEDİĞİNİZDEN EMİN MİSİNİZ?', 
      backdropDismiss: false,
      buttons: [
        { text: 'HAYIR', role: 'cancel' },
        {
          text: 'EVET, SİL',
          handler: () => {
            this.liste.splice(n, 1);
            localStorage.setItem('harcamalar', JSON.stringify(this.liste));
            this.hesapla();
          }
        }
      ]
    });
    await u.present();
  }
}