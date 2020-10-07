import { HomeForumData } from './../../../@core/mock/homeForumData';

import { ForumService } from './../../services/forum.service';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeForumComponent } from './home-forum.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtService, ApiService } from 'src/app/modules/@core';
import { of } from 'rxjs';

describe('HomeForumComponent', () => {
    let component: HomeForumComponent;
    let fixture: ComponentFixture<HomeForumComponent>;
    let homeForumService: ForumService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeForumComponent],
            imports: [HttpClientTestingModule, HttpClientModule],
            providers: [JwtService, ForumService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeForumComponent);
        component = fixture.componentInstance;
        // homeForumService = TestBed.get(ForumService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a button create a topic', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.create-topic a').textContent).toContain("CREATE A NEW TOPIC");
    })

    it('should have a button Visit the forum', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.link-to-forum a').textContent).toContain("Visit the Forum");
    })

    it('should have a community-forum-title and sub paragraph', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.community-forum-title h3').textContent).toEqual('Community Forum');
        expect(fixture.nativeElement.querySelector('.community-forum-title p').textContent).toContain('Have a question, or a travel')
    })

    it('should hava a topic-title', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.topic-title').textContent).toEqual('Topics');
    })

});

describe("Test function ngOnInit()", () => {
    let apiService: ApiService;
    let jwtService: JwtService;
    let forumService: ForumService;
    let httpClientSpy: { get: jasmine.Spy }
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeForumComponent],
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [ForumService, JwtService, ApiService]
        })
            .compileComponents()
    })
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        apiService = new ApiService(httpClientSpy as any, jwtService);
        forumService = new ForumService(apiService);
    })
    it("should be call ngOnInit() once", () => {
        let dummyHomeForum = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyHomeForum));
        let component = new HomeForumComponent(forumService);
        component.ngOnInit();
        expect(httpClientSpy.get.calls.count()).toBe(1);
    })
    it("should be return showtopics list", () => {
        let dummyHomeForum = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyHomeForum));
        let component = new HomeForumComponent(forumService);
        component.ngOnInit();
        expect(component.htmlTopicData.length).toBeGreaterThan(0);
        expect(component.htmlTopicData).toEqual(dummyHomeForum.payload.showTopics);
    })
    it("should be htmlTopicData not null", () => {
        let dummyHomeForum = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyHomeForum));
        let component = new HomeForumComponent(forumService);
        component.ngOnInit();
        expect(component.htmlTopicData).not.toBeNull();
    })
    it("should be environmentBaseUrl not null", () => {
        let dummyHomeForum = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyHomeForum));
        let component = new HomeForumComponent(forumService);
        component.ngOnInit();
        expect(component.environmentBaseUrl).not.toBeNull();
    })
    it("should be htmlTopicData have Topic, Replies and Votes", () => {
        let dummyHomeForum = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyHomeForum));
        let component = new HomeForumComponent(forumService);
        component.ngOnInit();
        expect(component.htmlTopicData[0].title).toEqual(HomeForumData.payload.showTopics[0].title);
        expect(component.htmlTopicData[0].votes).toEqual(HomeForumData.payload.showTopics[0].votes);
        expect(component.htmlTopicData[0].postcount).toEqual(HomeForumData.payload.showTopics[0].postcount);
    })
})

