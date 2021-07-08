<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto w-full">
      <!-- makeZip -->
      <div class="inline-flex text-center justify-center">
      <button @click="makePDF" class="flex ml-4 text-white bg-indigo-500 border-0 py-2 my-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg my-8">Generate PDF</button>
      <button @click="makeZip" class="flex ml-4 text-white bg-indigo-500 border-0 py-2 my-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg my-8">Generate Zip</button>
      </div>
      <h2 class="text-4xl font-bold m-4 p-4">{{heading}}</h2>

      <table class="table-auto my-4">
          <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Heading</th>
                  <th class="py-3 px-6 text-left">Remarks</th>
              </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
              <tr v-for="(item,i) in items" :key="i" class="border-b border-gray-200 hover:bg-gray-100">
                  <td class="py-3 px-6 text-left whitespace-nowrap"> {{ item.title}}</td>
                  <td class="py-3 px-6 text-left overflow-x-visible"> {{ item.body}}</td>
              </tr>
          </tbody>
      </table>

      <div class="ml-2" v-for="(text,i) in moreText" :key="i">{{text}}</div>
      <div class="ml-2" v-for="(text,i) in moreText2" :key="i">{{text}}</div>
    </div>
  </section>
</template>

<script>
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import JSZip from 'jszip'
import FileSaver from "file-saver";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
 

export default ({
  name: "docPrint",  
  data(){
    return {
      heading: "Sample PDF Generator",
      moreText: [
        "This is another few sentences of text to look at it.",
        "Just testing the paragraphs to see how they format.",
        "jsPDF likes arrays for sentences.",
        "Do paragraphs wrap properly?",
        "Yes, they do!",
        "What does it look like?",
        "Not bad at all."
      ],
      moreText2: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio culpa, porro voluptatem molestias placeat dolorem magni veritatis in excepturi eveniet necessitatibus nulla dolores quas quo sapiente labore perferendis quis dolorum. Provident eius distinctio culpa! Ab perferendis mollitia, eveniet facilis voluptates tempora quibusdam. Ea illum quo aliquam maxime exercitationem neque necessitatibus reiciendis alias ullam tempora doloribus sapiente, optio facere eos nam repellendus harum quisquam sunt laborum cupiditate, minima nesciunt! Quam, voluptates quasi. Officiis in assumenda nisi consequatur voluptatum quam alias tenetur ad labore quidem adipisci rem aliquam, error, nemo nesciunt ex voluptas numquam similique consectetur deleniti quaerat exercitationem at! Enim, dicta! Illo blanditiis dolorem, aut, velit nesciunt tempora, placeat maiores recusandae aliquid cupiditate voluptatem id. Velit a quasi ab molestias sapiente."
      ],
      items: [
        { title: "Heading 1", body: "I am Heading 1 body text" },
        { title: "Heading 2", body: "I am Heading 2 body text" },
        { title: "Heading 3", body: "I am Heading 3 body text" },
        { title: "Heading 4", body: "I am Heading 4 body text" },
        { title: "Notes: ", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, expedita corporis repellendus minima voluptatem reiciendis vero nisi animi sapiente ipsum quod placeat illo ipsam numquam doloribus repudiandae ullam ad, porro tempora. Quis doloribus expedita maiores cum, quo ad repudiandae blanditiis omnis esse pariatur! Eligendi fuga voluptatem, fugit eos mollitia consequatur ea saepe optio officiis ad ipsa culpa cumque aliquam esse illum sint impedit excepturi rem adipisci iusto suscipit nam? Expedita voluptatibus mollitia cum. Ipsam optio, nobis, dolores est iusto minima aut rerum corporis temporibus eligendi cum sapiente illum similique sunt quasi, pariatur ducimus natus assumenda placeat adipisci. Consequuntur, quos velit."},
        { title: "other remarks", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolores similique animi recusandae deleniti illo quaerat eos ipsa, laborum quod aperiam necessitatibus, temporibus numquam impedit? Corrupti architecto ad reprehenderit! Tenetur numquam, maiores beatae vel, fugiat officia eos a tempore officiis debitis quasi excepturi. Sequi ab inventore voluptas sunt a facere, dolore vitae. Eveniet officiis blanditiis quo consectetur nam ratione? Blanditiis deleniti vel inventore facere ipsa illum numquam, molestias animi, recusandae minima ea nobis? Animi accusantium perferendis ad temporibus maxime? Eaque consequuntur veritatis voluptates dolorum ad assumenda facere illo beatae itaque, consequatur eius modi officia impedit debitis sunt ullam cumque quas soluta maiores excepturi quaerat. Consequuntur, aliquid minima accusamus at facilis illo eligendi architecto consequatur repellendus, esse quos nam doloremque eius. Voluptate, harum accusantium, esse consequuntur magni odit molestiae natus eos numquam quasi ut dicta ab voluptatibus sint sit saepe veritatis mollitia nesciunt odio eaque quo. Ducimus ipsum, aliquid maiores eius nulla nostrum expedita accusamus, excepturi dolores fugiat deserunt non rerum sequi, optio consectetur aliquam. Impedit quidem quam perspiciatis numquam esse, ipsa suscipit magni eaque molestias beatae recusandae dignissimos vero odit nostrum quisquam ea accusamus earum doloribus labore sed maxime pariatur, alias minima deserunt? Possimus ipsum dolores vel placeat nulla quae quam tempora!"}
      ]
    };
  },
  methods: {
    async makePDF(){
      const columns = [
        { title: "Heading", dataKey: "title" },
        { title: "Remarks", dataKey: "body" }
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      
      doc.text(this.heading, 0.5, 0.8, { align: "left" });
      doc.autoTable({
        columns,
        body: this.items,
        margin: { left: 0.5, top: 1.25 }
      });
      doc.text(this.moreText, 0.5, 9.0, { align: "left" });
      // doc.autoTable({ html: '#document' })
      doc.addPage()
      doc.text(this.moreText2, 0.5, 1.0, { align: "left", maxWidth: "7.5" });
      doc.save(`${this.heading}.pdf`);
    },
    async makeZip(){
        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create()

        // Embed the Times Roman font
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

        // Add a blank page to the document
        const page = pdfDoc.addPage()

        // Get the width and height of the page
        const { width, height } = page.getSize()

        // Draw a string of text toward the top of the page
        const fontSize = 30
        const form = pdfDoc.getForm()

        page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 })

        const superheroField = form.createTextField('favorite.superhero')
        superheroField.setText('One Punch Man')
        superheroField.addToPage(page, { x: 55, y: 640 })

        page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 })

        page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 })
        page.drawText('Saturn IV', { x: 120, y: 500, size: 18 })
        page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 })
        page.drawText('Space Launch System', { x: 340, y: 500, size: 18 })

        const rocketField = form.createRadioGroup('favorite.rocket')
        rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 })
        rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 })
        rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 })
        rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 })
        rocketField.select('Saturn IV')

        page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 })

        page.drawText('Exia', { x: 120, y: 400, size: 18 })
        page.drawText('Kyrios', { x: 120, y: 340, size: 18 })
        page.drawText('Virtue', { x: 340, y: 400, size: 18 })
        page.drawText('Dynames', { x: 340, y: 340, size: 18 })

        const exiaField = form.createCheckBox('gundam.exia')
        const kyriosField = form.createCheckBox('gundam.kyrios')
        const virtueField = form.createCheckBox('gundam.virtue')
        const dynamesField = form.createCheckBox('gundam.dynames')

        exiaField.addToPage(page, { x: 55, y: 380 })
        kyriosField.addToPage(page, { x: 55, y: 320 })
        virtueField.addToPage(page, { x: 275, y: 380 })
        dynamesField.addToPage(page, { x: 275, y: 320 })

        exiaField.check()
        dynamesField.check()

        page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 })

        const planetsField = form.createDropdown('favorite.planet')
        planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
        planetsField.select('Pluto')
        planetsField.addToPage(page, { x: 55, y: 220 })

        page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 })

        const personField = form.createOptionList('favorite.person')
        personField.addOptions([
          'Julius Caesar',
          'Ada Lovelace',
          'Cleopatra',
          'Aaron Burr',
          'Mark Antony',
        ])
        personField.select('Ada Lovelace')
        personField.addToPage(page, { x: 55, y: 70 })

        page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()

        const zip = new JSZip();
        zip.file(`${this.heading}.pdf`, pdfBytes);
        zip.generateAsync({type:"blob"}).then(function(pdfBytes) {
            // see FileSaver.js
            saveAs(pdfBytes, "example.zip");
        });
    },
  },
})
</script>

<style>
  #document{
    width: 8.5in;
    height: 11in;
    margin-top: 60px;
    padding: 20px;
  }
</style>