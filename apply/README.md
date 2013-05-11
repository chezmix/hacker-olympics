Application Puzzle
===============

0 1 8 16 46 74 96 106 109 126 127 186 192 255

Instructions:
Use the list of | highlighted numbers above to construct a list of valid IP addresses, | each number may only be used once per permutation.
An IP address from that list will | help you get a password for the Hacker Olympics, but we won't tell you which one.
Send | a form encoded POST request containing your "name" as the only parameter to the "/hackerolympics.json" endpoint at the correct IP (e.g. http://1.2.3.4/hackerolympics.json) and you will get back a JSON | response with a password and url that will let you register for the event.
Watch out for dummy servers | that reply to your request, but do not include a password.