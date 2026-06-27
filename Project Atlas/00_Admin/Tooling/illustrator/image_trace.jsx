/*
 * image_trace.jsx — The Match Day Club
 * Runs Illustrator's native Image Trace on a raster logo and expands it to clean vector.
 * Use this if you have a HIGHER-RESOLUTION source than the website's 390px logo (Illustrator's
 * tracer + your good source = the best automated path to a true master).
 *
 * Steps: place raster -> Image Trace (tuned for a flat 2-colour mark) -> Expand -> export.
 * Then recolour to spot colours with build_master.jsx, or by hand.
 *
 * Run: open Illustrator, File > Scripts > Other Script…  (or via osascript from local Claude).
 * Log: ~/Desktop/mdc_illustrator_log.txt
 */
#target illustrator
(function () {
  // ===================== CONFIG =====================
  var RASTER  = "~/Desktop/matchday-logo-hires.png";   // <- REQUIRED: your best-resolution logo art
  // OUT_DIR auto-resolves next to this script's repo; override if running via COM string.
  var OUT_DIR;
  try { OUT_DIR = new File($.fileName).parent.parent.parent.parent.fsName + "/08_Exports/Print/"; }
  catch (e) { OUT_DIR = "~/PnP/Project Atlas/08_Exports/Print/"; }
  var BASENAME = "MDC_Shield_Traced";
  // =========================================================================

  var log = []; function L(m){ log.push(String(m)); }
  function writeLog(){ try{ var lf=new File(Folder.desktop+"/mdc_illustrator_log.txt"); lf.open("w"); lf.write(log.join("\n")); lf.close(); }catch(e){} }

  try {
    var rf = new File(RASTER);
    if (!rf.exists) throw new Error("Raster not found: " + rf.fsName);

    var doc = app.documents.add(DocumentColorSpace.RGB);
    var placed = doc.placedItems.add();
    placed.file = rf;
    L("Placed: " + rf.fsName);

    // --- Image Trace ---
    var tracingObj = placed.trace();          // returns the tracing plugin item
    var opt = tracingObj.tracing.tracingOptions;
    // Tuned for a flat, hard-edged 2-colour mark:
    try { opt.tracingMode = TracingModeType.TRACINGMODECOLOR; } catch (e) {}
    try { opt.palette = "Limited"; } catch (e) {}
    try { opt.maxColors = 3; } catch (e) {}                 // ink + 2 greens (or 2)
    try { opt.pathFidelity = 100; } catch (e) {}            // hug the source edges
    try { opt.cornerFidelity = 100; } catch (e) {}          // keep sharp corners
    try { opt.noiseFidelity = 1; } catch (e) {}             // pick up small detail
    try { opt.ignoreWhite = true; } catch (e) {}
    L("Image Trace options applied.");

    tracingObj.tracing.expandTracing();        // -> editable paths
    L("Expanded tracing to vector paths.");

    // --- exports ---
    var base = OUT_DIR + BASENAME;
    var ai = new IllustratorSaveOptions(); ai.compatibility = Compatibility.ILLUSTRATOR17; ai.pdfCompatible = true;
    doc.saveAs(new File(base + ".ai"), ai); L("Saved .ai");
    var eps = new EPSSaveOptions(); eps.compatibility = Compatibility.ILLUSTRATOR17; eps.embedAllFonts = true;
    doc.saveAs(new File(base + ".eps"), eps); L("Saved .eps");
    var pdf = new PDFSaveOptions(); try { pdf.pDFPreset = "[High Quality Print]"; } catch (e) {}
    doc.saveAs(new File(base + ".pdf"), pdf); L("Saved .pdf");

    L("DONE — review the trace, then recolour to spot colours (build_master.jsx) and tidy stray nodes.");
  } catch (e) {
    L("ERROR: " + e.message + (e.line ? " (line " + e.line + ")" : ""));
  }
  writeLog();
  try { alert(log.join("\n")); } catch (e) {}
})();
