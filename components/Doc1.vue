<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      
      <button @click="makePDF" class="flex mx-auto text-white bg-indigo-500 border-0 py-2 my-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg my-8">Generate PDF</button>
      
      <h2 class="text-4xl font-bold m-4 p-4">{{heading}}</h2>

      <table class="min-w-max w-full table-auto my-4 overflow-visible">
          <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Heading</th>
                  <th class="py-3 px-6 text-left">Remarks</th>
              </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
              <tr v-for="(item,i) in items" :key="i" class="border-b border-gray-200 hover:bg-gray-100">
                  <td class="py-3 px-6 text-left whitespace-nowrap"> {{ item.title}}</td>
                  <td class="py-3 px-6 text-left whitespace-nowrap"> {{ item.body}}</td>
              </tr>
          </tbody>
      </table>

      <div class="ml-2" v-for="(text,i) in moreText" :key="i">{{text}}</div>
      <div class="ml-2" v-for="(text,i) in moreText2" :key="i">{{text}}</div>
    </div>
  </section>
</template>

<script>
// import html2canvas from 'html2canvas'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
    makePDF(){
      // window.html2canvas = html2canvas;
      // var doc = new jsPDF("p", "pt", "a4");
      // doc.html(document.querySelector("#document"), {
      //   callback: function(pdf){
      //     pdf.save("mydoc.pdf");
      //   }
      // })
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

    }
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