# Ghorilard IoT : Front End
##### Visit [Ghorilard.vercel.app](https://Ghorilard.vercel.app)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

**Ghorilard** adalah _code name_ untuk produk IoT kami. Produk ini dibuat dengan tujuan memudahkan para pembudidaya udang jenis vanamee untuk _**monitoring**_ beberapa parameter kualitas air tambak mereka, sehingga ketika terjadi perubahan kondisi air, para pembudidaya dapat melakukan penanganan agar kondisi air tidak berakibat fatal untuk kelangsungan hidup udang. 

Selain itu pada sistem kami juga disediakan fitur _**guides**_ atau panduan untuk penanganan kondisi air yang tepat. Panduan tersebut kami susun berdasarkan dokumen dan wawancara dengan Bapak Suparjo S.Tr.Pi. selaku Penyuluh Dinas Perikanan Kabupaten Pemalang.

## System Front-End Flow
Untuk keseluruhan flow dalam sistem front-end, dapat melihat pada [pdf flow-front-end](https://drive.google.com/file/d/1DDjyNaGWnjOZ3Zjk7n856PGWqj5shMAl/view?usp=sharing).

## Features

- Progressive Web App (PWA)
- Monitoring Parameter Water Quality ( Graph )
- Statistik data (rata-rata data parameter berdasarkan waktu : pagi, siang, atau malam)
- Filter data berdasarkan jangka waktu yang diinginkan
- Panduan pengelolaan kualitas air
- Helpdesk chat
- Export graph document

## Dependencies
Ghorilard front-end menggunakan library [SvelteJS](https://dillinger.io/). Dengan menggunakan tambahan library/plugin lain sebagai berikut.

- [Svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router) 
- [Svelte-session-manager](https://github.com/arlac77/svelte-session-manager)
- [Apexchart](https://github.com/galkatz373/svelte-apexcharts)
- [Sass-preprocessor](https://github.com/ls-age/svelte-preprocess-sass)
- [Socket IO](https://socket.io/)

Khusus untuk [Svelte-session-manager](https://github.com/arlac77/svelte-session-manager), terdapat beberapa code yang telah dimodifikasi untuk menyesuaikan dengan [Backend](https://github.com/RichardAlvin/be-ghorilard)

## Component UI

Untuk memudahkan proses developtment dan proses pengembangan nantinya. Setiap komponen UI, script store, dan stylesheet terpisah dalam satu file.

```text
Src/
└── Dasboard-Comp/
    ├── toor
└── pages/
└── sass/
└── pages/
```

## Installation
Lakukan clone repositori ini. Kemudian install dependencies yang diperlukan dan nyalakan server.

```sh
cd ghorilard-pwa
npm i
npm run dev
```

## Ghorilard Project

- Backend Development : [github.com/RichardAlvin/be-ghorilard](https://github.com/RichardAlvin/be-ghorilard)
- End Device Final Produc and Configuration : [github.com/ghofaralhasyim/end-device-ghorilard](https://github.com/ghofaralhasyim/end-device-ghorilard)
