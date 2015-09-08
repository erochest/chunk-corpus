
module Chunk.Main where


import Control.Monad.Eff
import Control.Monad.Eff.Console
import Control.Bind
import DOM.Node.NonDocumentTypeChildNode
import DOM.Node.NonElementParentNode
import DOM.HTML
import DOM.HTML.Document
import DOM.HTML.Window
import DOM.Node.Document
import DOM.Node.Types
import DOM.HTML.Types
import Prelude
import Data.Nullable
import Data.Maybe
import Data.Date


foreign import watch_ :: forall a. Unit -> String -> a -> Unit

watch :: forall a eff. String -> a -> Eff (console :: CONSOLE | eff) Unit
watch msg obj = return $ watch_ unit msg obj


main :: forall eff. Eff (console :: CONSOLE, dom :: DOM.DOM, now :: Now | eff) Unit
main = do
  inputFiles <-  getElementById (ElementId "input_files")
                 <<< htmlDocumentToNonElementParentNode
             =<< document
             =<< window
  watch "inputFiles" inputFiles

  watch "Howdy!" =<< now
