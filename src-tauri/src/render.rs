use std::io::Write;

use anyhow::Error;
use orgize::export::{DefaultHtmlHandler, HtmlEscape, HtmlHandler};
use orgize::Element;
use prism_js::{highlight, init};

#[derive(Default)]
pub struct MyHtmlHandler(DefaultHtmlHandler);

impl HtmlHandler<Error> for MyHtmlHandler {
    fn start<W: Write>(&mut self, mut w: W, element: &Element) -> Result<(), Error> {
        if let Element::SourceBlock(block) = element {
            let mut context = init();
            if let Some(highlighted) = highlight(&mut context, &block.contents, &block.language) {
                write!(
                    w,
                    "<pre class=\"language-{} org-pre\"><code class=\"language-{} org-code\">{}</code></pre>",
                    block.language, block.language, highlighted
                )?;
            } else {
                write!(w, "<pre>{}</pre>", HtmlEscape(&block.contents))?;
            }
        } else {
            self.0.start(w, element)?;
        }
        Ok(())
    }

    fn end<W: Write>(&mut self, w: W, element: &Element) -> Result<(), Error> {
        self.0.end(w, element)?;
        Ok(())
    }
}
