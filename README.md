# Webhooks
Microservice for sending webhooks part of a group project at Codaisseur.

Whenever an event gets posted to our /events route by any of the other microservices we check if there are any webhooks subscribed
to that event in our database and send a post request with the event to the registered url.
