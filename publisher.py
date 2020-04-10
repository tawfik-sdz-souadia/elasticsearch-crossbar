from autobahn.twisted.component import Component, run
from autobahn.twisted.util import sleep
from twisted.internet.defer import inlineCallbacks
import os
import argparse

url = os.environ.get('CBURL', 'ws://localhost:8080/ws')
realmv = os.environ.get('CBREALM', 'realm1')
topic = os.environ.get('CBTOPIC', 'com.myapp.hello')
component = Component(transports=url, realm=realmv)
print(url, realmv,topic,component)

@component.on_join
@inlineCallbacks
def joined(session, details):
    print("session ready")
    counter = 0
    while True:
        # publish() only returns a Deferred if we asked for an acknowledgement
        session.publish(topic , "Hello World %d"%counter)
        counter += 1
        yield sleep(1)

if __name__ == "__main__":
    run([component])


