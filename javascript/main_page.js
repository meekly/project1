//down.onmouseenter = a_hover(0.5);


down.onmouseenter = function a_hover() {
	m_form.style.opacity=0.5;
	m_body.style.backgroundColor="#ffddbb";
	down.style.opacity=1;
}

down.onmouseleave = function a_hover() {
	m_form.style.opacity=1;
	m_body.style.backgroundColor="#ffcc99";
}

news.style.height = document.documentElement.clientHeight + 'px';

//document.documentElement.clientHeight

