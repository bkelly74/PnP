/*
 * build_master.jsx — The Match Day Club
 * Turns the clean vector master into true Adobe-native print masters.
 *
 * What it does (in Illustrator, locally):
 *   1. Opens the geometric master SVG.
 *   2. Defines brand SPOT colours (CMYK now; confirm Pantone against a book).
 *   3. Recolours the ink + green art to those spot colours.
 *   4. Converts the document to CMYK.
 *   5. Exports .ai, .eps, print .pdf, and a 4x PNG.
 *   6. Writes a log to ~/Desktop/mdc_illustrator_log.txt.
 *
 * Run (easiest, any OS): open Adobe Illustrator > File > Scripts > Other Script… > pick this file.
 *   Paths auto-resolve relative to this file, so no editing needed.
 * Run (Windows automation): PowerShell, with Illustrator open:
 *     $ai = New-Object -ComObject Illustrator.Application
 *     $ai.DoJavaScript( (Get-Content ".\build_master.jsx" -Raw) )
 *   (COM passes a string, so set REPO_OVERRIDE in CONFIG below for that path.)
 * Run (macOS automation):
 *     osascript -e 'tell application "Adobe Illustrator" to do javascript (read file POSIX file "/ABS/build_master.jsx")'
 *
 * NOTE: written without a live Illustrator to test against — if a step errors,
 * the log captures it; have your local Claude agent read the log and adjust.
 */
#target illustrator
(function () {
  // ===================== CONFIG =====================
  // Zero-config when run via File > Scripts > Other Script…: paths are resolved
  // RELATIVE TO THIS SCRIPT FILE. Only set REPO_OVERRIDE if auto-detect fails
  // (e.g. when executed as a raw string via COM DoJavaScript).
  var REPO_OVERRIDE = "";  // e.g. "C:/Users/you/PnP/Project Atlas"
  var REPO;
  if (REPO_OVERRIDE) { REPO = REPO_OVERRIDE; }
  else { try { REPO = new File($.fileName).parent.parent.parent.parent.fsName; } catch (e) { REPO = "~/PnP/Project Atlas"; } }
  var SVG_IN   = REPO + "/08_Exports/Print/MDC_Shield_Master_Print.svg"; // clean geometric master
  var OUT_DIR  = REPO + "/08_Exports/Print/";
  var BASENAME = "MDC_Shield_Master";
  // Source RGB in the SVG (used to identify which art is which):
  var GREEN_RGB = [139, 198, 63];   // #8BC63F
  // Approximate CMYK for spot colours — CONFIRM against a Pantone fan deck:
  //   Green ~ PANTONE 368 C / 376 C  ·  Ink ~ PANTONE Black 6 C (or rich black)
  var GREEN_CMYK = [50, 0, 90, 0];
  var INK_CMYK   = [0, 0, 0, 100];
  // =========================================================================

  var log = [];
  function L(m) { log.push(String(m)); }

  function writeLog() {
    try {
      var lf = new File(Folder.desktop + "/mdc_illustrator_log.txt");
      lf.open("w"); lf.write(log.join("\n")); lf.close();
    } catch (e) {}
  }

  try {
    var f = new File(SVG_IN);
    if (!f.exists) throw new Error("SVG not found: " + f.fsName);

    var doc = app.open(f);
    L("Opened: " + f.fsName);

    // --- spot colours (define with CMYK; usable in any doc colour mode) ---
    function makeSpot(name, c, m, y, k) {
      var s;
      try { s = doc.spots.getByName(name); } catch (e) { s = doc.spots.add(); s.name = name; }
      s.colorType = ColorModel.SPOT;
      var cmyk = new CMYKColor();
      cmyk.cyan = c; cmyk.magenta = m; cmyk.yellow = y; cmyk.black = k;
      s.color = cmyk;
      return s;
    }
    var greenSpot = makeSpot("MDC Green (8BC63F)", GREEN_CMYK[0], GREEN_CMYK[1], GREEN_CMYK[2], GREEN_CMYK[3]);
    var inkSpot   = makeSpot("MDC Ink (0A0B0D)",  INK_CMYK[0],  INK_CMYK[1],  INK_CMYK[2],  INK_CMYK[3]);
    function spotColor(s) { var sc = new SpotColor(); sc.spot = s; sc.tint = 100; return sc; }
    var GREEN = spotColor(greenSpot), INK = spotColor(inkSpot);

    function isGreen(col) {
      return col && col.typename === "RGBColor" &&
             Math.abs(col.red - GREEN_RGB[0]) < 45 &&
             Math.abs(col.green - GREEN_RGB[1]) < 45 &&
             Math.abs(col.blue - GREEN_RGB[2]) < 45;
    }
    function pick(col) { return isGreen(col) ? GREEN : INK; }

    // --- recolour (handle groups, compound paths, plain paths) ---
    var ng = 0, ni = 0;
    function recolor(items) {
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        if (it.typename === "GroupItem") { recolor(it.pageItems); }
        else if (it.typename === "CompoundPathItem") {
          var sub = it.pathItems, src = sub.length ? sub[0].fillColor : null, sp = pick(src);
          for (var j = 0; j < sub.length; j++) { try { sub[j].fillColor = sp; (sp === GREEN ? ng++ : ni++); } catch (e) {} }
        } else if (it.typename === "PathItem") {
          try { var sp2 = pick(it.fillColor); it.fillColor = sp2; (sp2 === GREEN ? ng++ : ni++); } catch (e) {}
        }
      }
    }
    recolor(doc.pageItems);
    L("Recoloured -> green art: " + ng + ", ink art: " + ni);

    // --- to CMYK for print ---
    try { app.executeMenuCommand("doc-color-cmyk"); L("Converted document to CMYK."); }
    catch (e) { L("CMYK convert skipped: " + e.message); }

    doc = app.activeDocument;
    var base = OUT_DIR + BASENAME;

    // --- exports ---
    var ai = new IllustratorSaveOptions();
    ai.compatibility = Compatibility.ILLUSTRATOR17; ai.pdfCompatible = true;
    doc.saveAs(new File(base + "_PRINT.ai"), ai); L("Saved .ai");

    var eps = new EPSSaveOptions();
    eps.compatibility = Compatibility.ILLUSTRATOR17; eps.cmykPostScript = true; eps.embedAllFonts = true;
    doc.saveAs(new File(base + "_PRINT.eps"), eps); L("Saved .eps");

    var pdf = new PDFSaveOptions();
    try { pdf.pDFPreset = "[High Quality Print]"; } catch (e) {}
    doc.saveAs(new File(base + "_PRINT.pdf"), pdf); L("Saved .pdf");

    var png = new ExportOptionsPNG24();
    png.antiAliasing = true; png.transparency = true; png.artBoardClipping = true;
    png.horizontalScale = 400; png.verticalScale = 400;
    doc.exportFile(new File(base + "_4x.png"), ExportType.PNG24, png); L("Saved 4x .png");

    L("DONE — outputs in " + OUT_DIR);
  } catch (e) {
    L("ERROR: " + e.message + (e.line ? " (line " + e.line + ")" : ""));
  }

  writeLog();
  try { alert(log.join("\n")); } catch (e) {}
})();
