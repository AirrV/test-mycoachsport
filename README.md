DEMO :
A live demo is available here : airrv.github.io

Scalability:
In order to extend this game with additional elements, like Spock, Lizard... :
    1- add the additional elements in the "elements" array, allways by pair, the rule being :
    the first one added will have an odd id, meaning he will beat elements with an even and lower id but lose against odd and lower id.
    Ex: Add Spock as fourth element, he will beat rock(0) and scissors(2) but lose against paper(1);
    2- Manually add the corresponding button in "onePlayerScreenContent".

Alerts and prompts:
Those popup boxes are here to symbolize an interaction with the user. In a production context, they would be replaced with more user friendly items.