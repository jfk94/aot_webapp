
function demo_pdf() {

var pdf = new HPDF();

text_demo2(pdf);
text_annotation(pdf);
arc_demo(pdf);
line_demo(pdf);

document.getElementById("pdf_viewer").width = window.innerWidth;
document.getElementById("pdf_viewer").height = window.innerHeight - 100;
document.getElementById("pdf_viewer").src = pdf.toDataUri();

pdf.free();
}

function text_demo2(pdf) {
var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';

var no = 0;

function print_grid(pdf, page) {
  var height = page.height();
  var width = page.width();
  var font = pdf.font('Helvetica');

  page.setFontAndSize(font, 5);
  page.setGrayFill(0.5);
  page.setGrayStroke(0.8);

  /* Draw horizontal lines */
  var y = 0;
  while (y < height) {
    if (y % 10 == 0)
      page.setLineWidth(0.5);
    else {
      if (page.getLineWidth() != 0.25)
        page.setLineWidth(0.25);
    }

    page.moveTo(0, y);
    page.lineTo(width, y);
    page.stroke();

    if (y % 10 == 0 && y > 0) {
        page.setGrayStroke(0.5);

        page.moveTo(0, y);
        page.lineTo(5, y);
        page.stroke();

        page.setGrayStroke(0.8);
    }

    y += 5;
  }


  /* Draw virtical lines */
  var x = 0;
  while (x < width) {
    if (x % 10 == 0)
      page.setLineWidth(0.5);
    else {
      if (page.setLineWidth() != 0.25)
        page.setLineWidth(0.25);
    }

    page.moveTo(x, 0);
    page.lineTo(x, height);
    page.stroke()

    if (x % 50 == 0 && x > 0) {
      page.setGrayStroke(0.5);

      page.moveTo(x, 0);
      page.lineTo(x, 5);
      page.stroke();

      page.moveTo(x, height);
      page.lineTo(x, height - 5);
      page.stroke();

      page.setGrayStroke(0.8);
    }

    x += 5;
  }

  /* Draw horizontal text */
  y = 0;
  while (y < height) {
    if (y % 10 == 0 && y > 0) {
      page.beginText();
      page.moveTextPos(5, y - 2);
      page.showText(y.toString());
      page.endText();
    }

    y += 5;
  }


  /* Draw virtical text */
  x = 0;
  while (x < width) {
    if (x % 50 == 0 && x > 0) {
      page.beginText();
      page.moveTextPos(x, 5);
      page.showText(x.toString());
      page.endText();

      page.beginText();
      page.moveTextPos(x, height - 10);
      page.showText(x.toString());
      page.endText();
    }

    x += 5;
  }

  page.setGrayFill(0);
  page.setGrayStroke(0);
}


var PrintText = function(page) {
    var pos = page.currentTextPos();

    no++;
    buf = ".["+no+"]"+pos.x+" "+pos.y; 
    page.showText(buf);
}


SAMP_TXT = "The quick brown fox jumps over the lazy dog. ";

/* add a new page object. */
var page = pdf.addPage();
page.setSize('A5', 'PORTRAIT');

print_grid(pdf, page);

var page_height = page.height();

var font = pdf.font("Helvetica");
page.setTextLeading(20);

/* text_rect method */

/* HPDF_TALIGN_LEFT */
rect = {};
rect.left = 25;
rect.top = 545;
rect.right = 200;
rect.bottom = rect.top - 40;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
               rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_LEFT");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'l');

page.endText();

/* HPDF_TALIGN_RIGTH */
rect.left = 220;
rect.right = 395;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_RIGTH");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'RIGHT');

page.endText();

/* HPDF_TALIGN_CENTER */
rect.left = 25;
rect.top = 475;
rect.right = 200;
rect.bottom = rect.top - 40;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_CENTER");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'c');

page.endText();

/* HPDF_TALIGN_JUSTIFY */
rect.left = 220;
rect.right = 395;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_JUSTIFY");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'j');

page.endText();



/* Skewed coordinate system */
page.gSave();

angle1 = 5;
angle2 = 10;
rad1 = angle1 / 180 * 3.141592;
rad2 = angle2 / 180 * 3.141592;

page.concat(1, Math.tan(rad1), Math.tan(rad2), 1, 25, 350);
rect.left = 0;
rect.top = 40;
rect.right = 175;
rect.bottom = 0;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "Skewed coordinate system");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'l');

page.endText();

page.gRestore();


/* Rotated coordinate system */
page.gSave();

angle1 = 5;
rad1 = angle1 / 180 * 3.141592;

page.concat(Math.cos(rad1), Math.sin(rad1), -Math.sin(rad1), Math.cos(rad1), 220, 350);
rect.left = 0;
rect.top = 40;
rect.right = 175;
rect.bottom = 0;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "Rotated coordinate system");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'l');

page.endText();

page.gRestore();


/* text along a circle */
page.setGrayStroke(0);
page.circle(210, 190, 145);
page.circle(210, 190, 113);
page.stroke();

angle1 = 360 / (SAMP_TXT.length);
angle2 = 180;

page.beginText();
font = pdf.font("Courier-Bold");
page.setFontAndSize(font, 30);

for (i = 0; i < SAMP_TXT.length; i++) {
  var rad1 = (angle2 - 90) / 180 * 3.141592;
  var rad2 = angle2 / 180 * 3.141592;

  var x = 210 + Math.cos(rad2) * 122;
  var y = 190 + Math.sin(rad2) * 122;

  page.setTextMatrix(Math.cos(rad1), Math.sin(rad1), -Math.sin(rad1), Math.cos(rad1), x, y);

  page.showText(SAMP_TXT[i]);
  angle2 -= angle1;
}

page.endText();

}

///////////////////////////////////////////////////////////////////////////////

function text_annotation(pdf) {
var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


// [ left, bottom, right, top ]
var rect1 = [50, 350, 150, 400];
var rect2 = [210, 350, 350, 400];
var rect3 = [50, 250, 150, 300];
var rect4 = [210, 250, 350, 300];
var rect5 = [50, 150, 150, 200];
var rect6 = [210, 150, 350, 200];
var rect7 = [50, 50, 150, 100];
var rect8 = [210, 50, 350, 100];

/* use Times-Roman font. */
var font = pdf.font("Times-Roman", "WinAnsiEncoding");

var page = pdf.addPage();

page.setSize('A5', 'PORTRAIT');
//page.setWidth(400);
//page.setHeight(500);

page.beginText();
page.setFontAndSize(font, 16);
page.moveTextPos(130, 450);
page.showText("Annotation Demo");
page.endText();


var annot = page.createTextAnnot(rect1, "Annotation with Comment Icon. \n This annotation set to be opened initially.");

annot.setIcon('comment');
annot.setOpened(true);

annot = page.createTextAnnot(rect2,
            "Annotation with Key Icon");
annot.setIcon('PARAGRAPH');

annot = page.createTextAnnot(rect3,
            "Annotation with Note Icon");
annot.setIcon('NOTE');

annot = page.createTextAnnot(rect4,
            "Annotation with Help Icon");
annot.setIcon('HELP');

annot = page.createTextAnnot(rect5,
            "Annotation with NewParagraph Icon");
annot.setIcon('NEW_PARAGRAPH');

annot = page.createTextAnnot(rect6,
            "Annotation with Paragraph Icon");
annot.setIcon('PARAGRAPH');

annot = page.createTextAnnot(rect7,
            "Annotation with Insert Icon");
annot.setIcon('INSERT');

var encoding = pdf.encoder("ISO8859-2");

page.createTextAnnot(rect8,
            "Annotation with ISO8859 text ÓÔÕÖ×ØÙ", encoding);

page.setFontAndSize(font, 11);

page.beginText();
page.moveTextPos(rect1[0] + 35, rect1[3] - 20);
page.showText("Comment Icon.");
page.endText();

page.beginText();
page.moveTextPos(rect2[0] + 35, rect2[3] - 20);
page.showText("Key Icon");
page.endText();

page.beginText();
page.moveTextPos(rect3[0] + 35, rect3[3] - 20);
page.showText("Note Icon.");
page.endText();

page.beginText();
page.moveTextPos(rect4[0] + 35, rect4[3] - 20);
page.showText("Help Icon");
page.endText();

page.beginText();
page.moveTextPos(rect5[0] + 35, rect5[3] - 20);
page.showText("NewParagraph Icon");
page.endText();

page.beginText();
page.moveTextPos(rect6[0] + 35, rect6[3] - 20);
page.showText("Paragraph Icon");
page.endText();

page.beginText();
page.moveTextPos(rect7[0] + 35, rect7[3] - 20);
page.showText("Insert Icon");
page.endText();

page.beginText();
page.moveTextPos(rect8[0] + 35, rect8[3] - 20);
page.showText("Text Icon(ISO8859-2 text)");
page.endText();

}

///////////////////////////////////////////////////////////////////////////////

function arc_demo(pdf) {
var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


function print_grid(pdf, page) {
  var height = page.height();
  var width = page.width();
  var font = pdf.font('Helvetica');

  page.setFontAndSize(font, 5);
  page.setGrayFill(0.5);
  page.setGrayStroke(0.8);

  /* Draw horizontal lines */
  var y = 0;
  while (y < height) {
    if (y % 10 == 0)
      page.setLineWidth(0.5);
    else {
      if (page.getLineWidth() != 0.25)
        page.setLineWidth(0.25);
    }

    page.moveTo(0, y);
    page.lineTo(width, y);
    page.stroke();

    if (y % 10 == 0 && y > 0) {
        page.setGrayStroke(0.5);

        page.moveTo(0, y);
        page.lineTo(5, y);
        page.stroke();

        page.setGrayStroke(0.8);
    }

    y += 5;
  }


  /* Draw virtical lines */
  var x = 0;
  while (x < width) {
    if (x % 10 == 0)
      page.setLineWidth(0.5);
    else {
      if (page.setLineWidth() != 0.25)
        page.setLineWidth(0.25);
    }

    page.moveTo(x, 0);
    page.lineTo(x, height);
    page.stroke()

    if (x % 50 == 0 && x > 0) {
      page.setGrayStroke(0.5);

      page.moveTo(x, 0);
      page.lineTo(x, 5);
      page.stroke();

      page.moveTo(x, height);
      page.lineTo(x, height - 5);
      page.stroke();

      page.setGrayStroke(0.8);
    }

    x += 5;
  }

  /* Draw horizontal text */
  y = 0;
  while (y < height) {
    if (y % 10 == 0 && y > 0) {
      page.beginText();
      page.moveTextPos(5, y - 2);
      page.showText(y.toString());
      page.endText();
    }

    y += 5;
  }


  /* Draw virtical text */
  x = 0;
  while (x < width) {
    if (x % 50 == 0 && x > 0) {
      page.beginText();
      page.moveTextPos(x, 5);
      page.showText(x.toString());
      page.endText();

      page.beginText();
      page.moveTextPos(x, height - 10);
      page.showText(x.toString());
      page.endText();
    }

    x += 5;
  }

  page.setGrayFill(0);
  page.setGrayStroke(0);
}

/* add a new page object. */
var page = pdf.addPage();

page.setSize('A5', 'PORTRAIT');
//page.setHeight(220);
//page.setWidth(200);

/* draw grid to the page */
print_grid(pdf, page);

/* draw pie chart
 *
 *   A: 45% Red
 *   B: 25% Blue
 *   C: 15% green
 *   D: other yellow
 */

/* A */
page.setRGBFill(1.0, 0, 0);
page.moveTo(100, 100);
page.lineTo(100, 180);
page.arc(100, 100, 80, 0, 360 * 0.45);
pos = page.currentPos();
page.lineTo(100, 100);
page.fill();

/* B */
page.setRGBFill(0, 0, 1.0);
page.moveTo(100, 100);
page.lineTo(pos.x, pos.y);
page.arc(100, 100, 80, 360 * 0.45, 360 * 0.7);
pos = page.currentPos();
page.lineTo(100, 100);
page.fill();

/* C */
page.setRGBFill(0, 1.0, 0);
page.moveTo(100, 100);
page.lineTo(pos.x, pos.y);
page.arc(100, 100, 80, 360 * 0.7, 360 * 0.85);
pos = page.currentPos();
page.lineTo(100, 100);
page.fill();

/* D */
page.setRGBFill(1.0, 1.0, 0);
page.moveTo(100, 100);
page.lineTo(pos.x, pos.y);
page.arc(100, 100, 80, 360 * 0.85, 360);
pos = page.currentPos();
page.lineTo(100, 100);
page.fill();

/* draw center circle */
page.setGrayStroke(0);
page.setGrayFill(1);
page.circle(100, 100, 30);
page.fill();

}

///////////////////////////////////////////////////////////////////////////////

function line_demo(pdf) {
var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


var draw_line = function(page, x, y, label) {
  page.beginText()
  page.moveTextPos(x, y - 10);
  page.showText(label);
  page.endText()

  page.moveTo(x, y - 15);
  page.lineTo(x + 220, y - 15);
  page.stroke();
}

var draw_line2 = function(page, x, y, label) {
    page.beginText();
    page.moveTextPos(x, y);
    page.showText(label);
    page.endText();

    page.moveTo(x + 30, y - 25);
    page.lineTo(x + 160, y - 25);
    page.stroke()
}

var draw_rect = function(page, x, y, label) {
    page.beginText();
    page.moveTextPos(x, y - 10);
    page.showText(label);
    page.endText();

    page.rectangle(x, y - 40, 220, 25);
}

var page_title = "Line Example";

var DASH_MODE1 = [3];
var DASH_MODE2 = [3, 7];
var DASH_MODE3 = [8, 7, 2, 7];

/* create default-font */
var font = pdf.font ("Helvetica");

/* add a new page object. */
page = pdf.addPage(pdf);

/* print the lines of the page. */
page.setLineWidth(1);
page.rectangle(50, 50, page.width() - 100,
            page.height() - 110);
page.stroke();

/* print the title of the page (with positioning center). */
page.setFontAndSize(font, 24);
var tw = page.textWidth(page_title);
page.beginText();
page.moveTextPos((page.width() - tw) / 2,
            page.height() - 50);
page.showText(page_title);
page.endText();

page.setFontAndSize(font, 10);

/* Draw verious widths of lines. */
page.setLineWidth(0);
draw_line(page, 60, 770, "line width = 0");

page.setLineWidth(1.0);
draw_line(page, 60, 740, "line width = 1.0");

page.setLineWidth(2.0);
draw_line(page, 60, 710, "line width = 2.0");

/* Line dash pattern */
page.setLineWidth(1.0);

page.setDash(DASH_MODE1, 1);
draw_line(page, 60, 680, "dash_ptn=[3], phase=1 --  2 on, 3 off, 3 on...");

page.setDash(DASH_MODE2, 2);
draw_line(page, 60, 650, "dash_ptn=[7, 3], phase=2 --  5 on 3 off, 7 on,...");

page.setDash(DASH_MODE3, 0);
draw_line(page, 60, 620, "dash_ptn=[8, 7, 2, 7], phase=0");

page.setDash([], 0);

page.setLineWidth(30);
page.setRGBStroke(0.0, 0.5, 0.0);

/* Line Cap Style */
page.setLineCap('BUTT_END');
draw_line2(page, 60, 570, "BUTT_END");

page.setLineCap('ROUND_END');
draw_line2(page, 60, 505, "ROUND_END");

page.setLineCap('PROJECTING_SCUARE_END');
draw_line2(page, 60, 440, "PROJECTING_SCUARE_END");

/* Line Join Style */
page.setLineWidth(30);
page.setRGBStroke(0.0, 0.0, 0.5);

page.setLineJoin('MITER_JOIN');
page.moveTo(120, 300);
page.lineTo(160, 340);
page.lineTo(200, 300);
page.stroke();

page.beginText();
page.moveTextPos(60, 360);
page.showText("MITER_JOIN");
page.endText();

page.setLineJoin('ROUND_JOIN');
page.moveTo(120, 195);
page.lineTo(160, 235);
page.lineTo(200, 195);
page.stroke();

page.beginText();
page.moveTextPos(60, 255);
page.showText("ROUND_JOIN");
page.endText();

page.setLineJoin('BEVEL_JOIN');
page.moveTo(120, 90);
page.lineTo(160, 130);
page.lineTo(200, 90);
page.stroke();

page.beginText();
page.moveTextPos(60, 150);
page.showText("BEVEL_JOIN");
page.endText();

/* Draw Rectangle */
page.setLineWidth(2);
page.setRGBStroke(0, 0, 0);
page.setRGBFill(0.75, 0.0, 0.0);

draw_rect(page, 300, 770, "Stroke");
page.stroke();

draw_rect(page, 300, 720, "Fill");
page.fill();

draw_rect(page, 300, 670, "Fill then Stroke");
page.fillStroke();

/* Clip Rect */
page.gSave();  /* Save the current graphic state */
draw_rect(page, 300, 620, "Clip Rectangle");
page.clip();
page.stroke();
page.setFontAndSize(font, 13);

page.beginText();
page.moveTextPos(290, 600);
page.setTextLeading(12);
page.showText("Clip Clip Clip Clip Clip Clipi Clip Clip Clip");
page.showTextNextLine("Clip Clip Clip Clip Clip Clip Clip Clip Clip");
page.showTextNextLine("Clip Clip Clip Clip Clip Clip Clip Clip Clip");
page.endText();
page.gRestore();

/* Curve Example(CurveTo2) */
var x = 330;
var y = 440;
var x1 = 430;
var y1 = 530;
var x2 = 480;
var y2 = 470;
var x3 = 480;
var y3 = 90;

page.setRGBFill(0, 0, 0);

page.beginText();
page.moveTextPos(300, 540);
page.showText("CurveTo2(x1, y1, x2. y2)");
page.endText();

page.beginText();
page.moveTextPos(x + 5, y - 5);
page.showText("Current point");
page.moveTextPos(x1 - x, y1 - y);
page.showText("(x1, y1)");
page.moveTextPos(x2 - x1, y2 - y1);
page.showText("(x2, y2)");
page.endText();

page.setDash(DASH_MODE1, 0);

page.setLineWidth(0.5);
page.moveTo(x1, y1);
page.lineTo(x2, y2);
page.stroke (page);

page.setDash([], 0);

page.setLineWidth(1.5);

page.moveTo(x, y);
page.curveTo2(x1, y1, x2, y2);
page.stroke();

/* Curve Example(CurveTo3) */
y -= 150;
y1 -= 150;
y2 -= 150;

page.beginText();
page.moveTextPos(300, 390);
page.showText("CurveTo3(x1, y1, x2. y2)");
page.endText();

page.beginText();
page.moveTextPos(x + 5, y - 5);
page.showText("Current point");
page.moveTextPos(x1 - x, y1 - y);
page.showText("(x1, y1)");
page.moveTextPos(x2 - x1, y2 - y1);
page.showText("(x2, y2)");
page.endText();

page.setDash(DASH_MODE1, 0);

page.setLineWidth(0.5);
page.moveTo(x, y);
page.lineTo(x1, y1);
page.stroke();

page.setDash([], 0);

page.setLineWidth(1.5);
page.moveTo(x, y);
page.curveTo3(x1, y1, x2, y2);
page.stroke();

/* Curve Example(CurveTo) */
y -= 150;
y1 -= 160;
y2 -= 130;
x2 += 10;

page.beginText();
page.moveTextPos(300, 240);
page.showText("CurveTo(x1, y1, x2. y2, x3, y3)");
page.endText();

page.beginText();
page.moveTextPos(x + 5, y - 5);
page.showText("Current point");
page.moveTextPos(x1 - x, y1 - y);
page.showText("(x1, y1)");
page.moveTextPos(x2 - x1, y2 - y1);
page.showText("(x2, y2)");
page.moveTextPos(x3 - x2, y3 - y2);
page.showText("(x3, y3)");
page.endText();

page.setDash(DASH_MODE1, 0);

page.setLineWidth(0.5);
page.moveTo(x, y);
page.lineTo(x1, y1);
page.stroke (page);
page.moveTo(x2, y2);
page.lineTo(x3, y3);
page.stroke();

page.setDash([], 0);

page.setLineWidth(1.5);
page.moveTo(x, y);
page.curveTo(x1, y1, x2, y2, x3, y3);
page.stroke();


}