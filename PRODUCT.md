# Product
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Customers of the Chapyar software (accounting, invoicing and online-ordering) read the wiki to learn and troubleshoot the product on their own. Chapyar's team writes and maintains the articles.

## Product Purpose
wiki.chapyar.com, «دانشنامه تخصصی نرم افزار چاپیار», is the Persian help center for Chapyar: step-by-step guides, FAQs and plugin documentation. It succeeds when a customer finds the right article and can read and follow it comfortably.

## Operating Context
- A fork of Wiki.js 3.x (`mostafa8026/wiki`, branch `sohail`) on srv168, behind the ArvanCloud CDN.
- Articles are Persian and right-to-left and carry many screenshots of the Chapyar desktop software.
- The main sidebar leads to the three tag collections: مطالب (articles), سوالات متداول (FAQ) and افزونه های نرم افزار (plugins).
- Search engines crawl and index the site.

## Capabilities and Constraints
- Persian (fa-IR) is the only site language. The interface and the content are both right-to-left.
- The fork must stay rebaseable on upstream `requarks/wiki`. Changes are kept small and isolated and are marked "Chapyar fork" in the code.
- Comments are off, as they were on the 2.x site; Disqus is configured but not enabled.

## Brand Commitments
- Site name: دانشنامه تخصصی نرم افزار چاپیار.
- The footer reads "Powered by Chapyar" and links to chapyar.com.
- Persian text is set in Vazirmatn, the current version of the Vazir font.

## Product Principles
- Reading comes first: a customer looking for an answer beats editing chrome.
- Right-to-left end to end. Nothing in the interface should read as a left-to-right layout with Persian text dropped in.
- Stay close to upstream, so every Wiki.js release can be taken with little effort.
