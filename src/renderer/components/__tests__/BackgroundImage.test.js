// Тесты для BackgroundImage компонента
describe('BackgroundImage', () => {
  it('should be a function', () => {
    expect(typeof BackgroundImage).toBe('function');
  });

  it('should render background image with correct structure', () => {
    const component = BackgroundImage({ src: 'test.jpg' });
    
    expect(component.type).toBe('div');
    expect(component.props.className).toBe('background-image ');
  });

  it('should set background image source', () => {
    const component = BackgroundImage({ src: 'test.jpg' });
    
    expect(component.props.style.backgroundImage).toBe('url(test.jpg)');
  });

  it('should set default alt text', () => {
    const component = BackgroundImage({ src: 'test.jpg' });
    
    expect(component.props['aria-label']).toBe('Background');
  });

  it('should set custom alt text', () => {
    const component = BackgroundImage({ src: 'test.jpg', alt: 'Custom background' });
    
    expect(component.props['aria-label']).toBe('Custom background');
  });

  it('should apply custom className', () => {
    const component = BackgroundImage({ src: 'test.jpg', className: 'custom-class' });
    
    expect(component.props.className).toBe('background-image custom-class');
  });

  it('should have correct background styles', () => {
    const component = BackgroundImage({ src: 'test.jpg' });
    
    const style = component.props.style;
    expect(style.backgroundSize).toBe('cover');
    expect(style.backgroundPosition).toBe('center');
    expect(style.backgroundRepeat).toBe('no-repeat');
    expect(style.backgroundAttachment).toBe('fixed');
  });

  it('should have correct positioning styles', () => {
    const component = BackgroundImage({ src: 'test.jpg' });
    
    const style = component.props.style;
    expect(style.position).toBe('fixed');
    expect(style.top).toBe(0);
    expect(style.left).toBe(0);
    expect(style.width).toBe('100%');
    expect(style.height).toBe('100%');
    expect(style.zIndex).toBe(-1);
  });

  it('should have correct accessibility attributes', () => {
    const component = BackgroundImage({ src: 'test.jpg' });
    
    expect(component.props.role).toBe('img');
    expect(component.props['aria-label']).toBe('Background');
  });

  it('should handle different image sources', () => {
    const component1 = BackgroundImage({ src: 'image1.png' });
    const component2 = BackgroundImage({ src: 'image2.jpg' });
    
    expect(component1.props.style.backgroundImage).toBe('url(image1.png)');
    expect(component2.props.style.backgroundImage).toBe('url(image2.jpg)');
  });

  it('should handle empty className', () => {
    const component = BackgroundImage({ src: 'test.jpg', className: '' });
    
    expect(component.props.className).toBe('background-image ');
  });
});

// Mock компонента BackgroundImage
function BackgroundImage({ 
  src, 
  alt = 'Background', 
  className = '' 
}) {
  return {
    type: 'div',
    props: {
      className: `background-image ${className}`,
      style: {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      },
      role: 'img',
      'aria-label': alt
    }
  };
}
