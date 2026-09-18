---
title: Inspect a Lightning invoice
description: Read invoice details without sending a payment.
---

This flow belongs to the unreleased Wallet source candidate. It is not a claim
that your installed store release supports Lightning payments.

Open **Send Lightning**, paste a BOLT11 invoice into **Invoice to inspect**,
then choose **Inspect invoice**. Review the decoded details and choose
**Save inspection** to retain the result in this wallet's local operation history.

Inspection does not contact the invoice recipient or send money. An expired
invoice or an unsupported required feature can be inspected, but its result
must not be treated as permission to pay. The result explicitly distinguishes
inspection from payment submission.

A saved node address, connection configuration or app policy also does not
prove a live Lightning connection. Payment requires a connected engine and
its separate approval and settlement checks. That complete payment journey
has not been verified for this candidate.
