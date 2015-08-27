
module Chunk.Main where


import Control.Monad.Eff
import Control.Monad.Eff.Console
import Control.Bind
import DOM.Node.NonDocumentTypeChildNode
import DOM.HTML
import DOM.HTML.Document
import DOM.HTML.Window
import DOM.Node.Document
import DOM.Node.Types
import DOM.HTML.Types
import Prelude
import Data.Nullable
import Data.Maybe


main :: forall eff. Eff eff Unit
main = do
  doc <-  return
      <<< map htmlElementToElement
      <<< toMaybe
      =<< body
      <<< document
      =<< window
  case doc of
    Just doc' -> do
      fileInput <- getElementById "input_files" doc'
      log "#input_files"
    Nothing -> log "No document"

  fileInput <- getElementById "input_files" doc

  log "Howdy!"
