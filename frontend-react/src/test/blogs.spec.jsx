import Blogs from '../pages/Blogs';
import { blogs } from '../data/blogs';
import { montar } from './utils';

describe('Vista Blogs', () => {
  let vista;
  afterEach(() => vista.desmontar());

  it('enlaza al detalle de los artículos', () => {
    vista= montar(<Blogs />);
    const c= vista.contenedor;

    expect(c.querySelectorAll('a[href^="/blogs/"]').length).toBe(blogs.length);
    blogs.forEach((blog) => {
      expect(c.querySelector(`a[href="/blogs/${blog.slug}"]`)).not.toBeNull();
    });
  });
});